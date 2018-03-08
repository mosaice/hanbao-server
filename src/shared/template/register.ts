export const register = (link: string): string => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Welcome Email</title>
</head>

<body>
  <span class="preheader"></span>
  <table class="body">
    <tr>
      <td class="center" align="center" valign="top">
        <center data-parsed="">

          <table align="center" class="container header float-center">
            <tbody>
              <tr>
                <td>
                  <table class="row">
                    <tbody>
                      <tr>
                        <th class="small-12 large-12 columns first last">
                          <table>
                            <tr>
                              <th>
                                <h1 class="text-center">Welcome to Hanbao</h1>
                              </th>
                              <th class="expander"></th>
                            </tr>
                          </table>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table align="center" class="container body-border float-center">
            <tbody>
              <tr>
                <td>
                  <table class="row">
                    <tbody>
                      <tr>
                        <th class="small-12 large-12 columns first last">
                          <table>
                            <tr>
                              <th>

                                <table class="spacer">
                                  <tbody>
                                    <tr>
                                      <td height="32px" style="font-size:32px;line-height:32px;">&#xA0;</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <center data-parsed="">
                                  <img src="http://7xrc2h.com1.z0.glb.clouddn.com/hanbao1.png" align="center" class="float-center">
                                </center>

                                <table class="spacer">
                                  <tbody>
                                    <tr>
                                      <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <h4>欢迎您注册我们的网站，点击链接完成注册流程。</h4>
                                <a href="${link}">Click me!</a>

                                <p>如果无法点击，请尝试复制链到浏览器中。</p>
                                <a href="${link}">${link}</a>                                
                              </th>
                              <th class="expander"></th>
                            </tr>
                          </table>
                        </th>
                      </tr>
                    </tbody>
                  </table>

                  <table class="spacer">
                    <tbody>
                      <tr>
                        <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

        </center>
      </td>
    </tr>
  </table>
  <!-- prevent Gmail on iOS font size manipulation -->
  <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>

</html>
`