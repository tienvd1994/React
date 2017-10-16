using SapoCloneApi.Models;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SapoCloneApi.Controllers
{
    [Authorize]
    public class SettingsController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        // GET: api/Settings
        public async Task<IHttpActionResult> GetSettings()
        {
            var items = await db.Settings.Where(m => m.Name.StartsWith("infomationsetting.")).ToListAsync();
            var settingViewModel = new SettingViewModel();

            if (items != null && items.Count() > 0)
            {
                settingViewModel.Logo = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.logo")).Value;
                settingViewModel.FacebookUrl = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.facebook")).Value;
                settingViewModel.SkypeUrl = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.skype")).Value;
                settingViewModel.Title = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.title")).Value;
                settingViewModel.Keyword = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.keyowrd")).Value;
                settingViewModel.Description = items.FirstOrDefault(m => m.Name.Equals("infomationsetting.description")).Value;
            }

            return Ok(new
            {
                settingViewModel,
            });
        }

        // GET: api/Settings/5
        [ResponseType(typeof(Setting))]
        public async Task<IHttpActionResult> GetSetting(int id)
        {
            Setting setting = await db.Settings.FindAsync(id);
            if (setting == null)
            {
                return NotFound();
            }

            return Ok(setting);
        }

        // POST: api/Settings
        [ResponseType(typeof(Setting))]
        public async Task<IHttpActionResult> PostSetting(SettingViewModel settingViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var logo = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.logo"));

            if (logo == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.logo",
                    Value = settingViewModel.Logo
                });
            }
            else
            {
                logo.Value = settingViewModel.Logo;
                db.Entry(logo).State = EntityState.Modified;
            }

            var facebook = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.facebook"));

            if (facebook == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.facebook",
                    Value = settingViewModel.FacebookUrl
                });
            }
            else
            {
                facebook.Value = settingViewModel.FacebookUrl;
                db.Entry(facebook).State = EntityState.Modified;
            }

            var skype = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.skype"));

            if (skype == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.skype",
                    Value = settingViewModel.SkypeUrl
                });
            }
            else
            {
                skype.Value = settingViewModel.SkypeUrl;
                db.Entry(skype).State = EntityState.Modified;
            }

            var title = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.title"));

            if (title == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.title",
                    Value = settingViewModel.Title
                });
            }
            else
            {
                title.Value = settingViewModel.Title;
                db.Entry(title).State = EntityState.Modified;
            }

            var description = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.description"));

            if (description == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.description",
                    Value = settingViewModel.Description
                });
            }
            else
            {
                description.Value = settingViewModel.Description;
                db.Entry(description).State = EntityState.Modified;
            }

            var keyword = await db.Settings.FirstOrDefaultAsync(m => m.Name.Equals("infomationsetting.keyowrd"));

            if (keyword == null)
            {
                db.Settings.Add(new Setting
                {
                    Name = "infomationsetting.keyowrd",
                    Value = settingViewModel.Keyword
                });
            }
            else
            {
                keyword.Value = settingViewModel.Keyword;
                db.Entry(keyword).State = EntityState.Modified;
            }

            await db.SaveChangesAsync();

            return Ok(new
            {
                status = true,
                data = settingViewModel
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}