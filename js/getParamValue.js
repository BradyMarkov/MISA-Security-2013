$.extend({
            getParamValue: function (paramName) {
                ///	<summary>
                ///		Get the value of input parameter from the querystring
                ///	</summary>
                ///	<param name="paramName" type="String">The input parameter whose value is to be extracted</param>
                ///	<returns type="String">The value of input parameter from the querystring</returns>
				///http://codeasp.net/blogs/raghav_khunger/microsoft-net/1164/get-querystring-values-using-jquery

                parName = paramName.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
                var pattern = '[\\?&]' + paramName + '=([^&#]*)';
                var regex = new RegExp(pattern);
                var matches = regex.exec(window.location.href);
                if (matches == null) return '';
                else return decodeURIComponent(matches[1].replace(/\+/g, ' '));
            }
        });
