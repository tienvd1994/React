using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using SapoCloneApi.Controllers;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SapoCloneApi.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var user = await new EmployeesController().GetByFirstNameAndLastName(context.UserName, context.Password);

            if (user == null)
            {
                //context.SetError("invalid_grant", "The user name or password is incorrect.");
                var identity1 = new ClaimsIdentity(context.Options.AuthenticationType);
                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                         "error_message", "The user name or password is incorrect."
                    },
                    {
                         "status", "false"
                    }
                });
                var ticket1 = new AuthenticationTicket(identity1, props);
                context.Validated(ticket1);

                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.EmployeeID.ToString()));
            identity.AddClaim(new Claim("user_name", context.UserName));
            AuthenticationProperties properties = CreateProperties(user.EmployeeID, user.FirstName);
            var ticket = new AuthenticationTicket(identity, properties);
            context.Validated(ticket);
            await base.GrantResourceOwnerCredentials(context);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }


        public static AuthenticationProperties CreateProperties(long userId, string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userId", userId.ToString() },
                { "userName", userName },
            };
            return new AuthenticationProperties(data);
        }
    }
}