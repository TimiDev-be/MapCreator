[Setup]
AppName=MapCreator
AppVersion=0.1.0
DefaultDirName={autopf}\MapCreator
DefaultGroupName=MapCreator
OutputBaseFilename=MapCreator-Setup-winx64-0.1.0
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
SetupIconFile=Assets\MapCreator.ico

[Code]
function WebView2Installed: Boolean;
var
  Version: String;
begin
  Result := RegQueryStringValue(HKLM, 
    'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}',
    'pv', Version) and (Version <> '0.0.0.0') and (Version <> '');
end;

procedure InstallWebView2;
var
  ResultCode: Integer;
begin
  DownloadTemporaryFile(
    'https://go.microsoft.com/fwlink/p/?LinkId=2124703',
    'MicrosoftEdgeWebview2Setup.exe',
    '',
    nil
  );
  Exec(ExpandConstant('{tmp}\MicrosoftEdgeWebview2Setup.exe'),
    '/silent /install', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssInstall then
  begin
    if not WebView2Installed then
      InstallWebView2;
  end;
end;

[Files]
Source: "bin\Release\net10.0-windows\win-x64\publish\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\MapCreator"; Filename: "{app}\MapCreator.exe"
Name: "{commondesktop}\MapCreator"; Filename: "{app}\MapCreator.exe"

[Run]
Filename: "{app}\MapCreator.exe"; Description: "Launch MapCreator"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\wwwroot\dist"
Type: filesandordirs; Name: "{localappdata}\MapCreator"
