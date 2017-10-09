using System;
using System.Text.RegularExpressions;

namespace SapoCloneApi.Common
{
    public class Utils
    {
        public static String Ucs2Convert(String sContent)
        {
            if (string.IsNullOrWhiteSpace(sContent))
            {
                return string.Empty;
            }

            sContent = sContent.Replace("\\", string.Empty);
            sContent = sContent.Trim();

            const string sUtf8Lower = "a|á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ|đ|e|é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|i|í|ì|ỉ|ĩ|ị|o|ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|u|ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|y|ý|ỳ|ỷ|ỹ|ỵ";
            const string sUtf8Upper = "A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Đ|E|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|I|Í|Ì|Ỉ|Ĩ|Ị|O|Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|U|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Y|Ý|Ỳ|Ỷ|Ỹ|Ỵ";
            const string sUcs2Lower = "a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|a|d|e|e|e|e|e|e|e|e|e|e|e|e|i|i|i|i|i|i|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|o|u|u|u|u|u|u|u|u|u|u|u|u|y|y|y|y|y|y";
            const string sUcs2Upper = "A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|A|D|E|E|E|E|E|E|E|E|E|E|E|E|I|I|I|I|I|I|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|O|U|U|U|U|U|U|U|U|U|U|U|U|Y|Y|Y|Y|Y|Y";

            var aUtf8Lower = sUtf8Lower.Split('|');
            var aUtf8Upper = sUtf8Upper.Split('|');
            var aUcs2Lower = sUcs2Lower.Split('|');
            var aUcs2Upper = sUcs2Upper.Split('|');
            var nLimitChar = aUtf8Lower.GetUpperBound(0);

            for (int i = 1; i <= nLimitChar; i++)
            {
                sContent = sContent.Replace(aUtf8Lower[i], aUcs2Lower[i]);
                sContent = sContent.Replace(aUtf8Upper[i], aUcs2Upper[i]);
            }

            const string sUcs2Regex = @"[.A-Za-z0-9- ]";
            var sEscaped = new Regex(sUcs2Regex, RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.ExplicitCapture).Replace(sContent, string.Empty);

            if (string.IsNullOrEmpty(sEscaped))
            {
                return sContent.ToLower();
            }

            sEscaped = sEscaped.Replace("[", "\\[");
            sEscaped = sEscaped.Replace("]", "\\]");
            sEscaped = sEscaped.Replace("^", "\\^");
            var sEscapedregex = @"[" + sEscaped + "]";

            return new Regex(sEscapedregex, RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.ExplicitCapture).Replace(sContent, string.Empty).ToLower();
        }
    }
}