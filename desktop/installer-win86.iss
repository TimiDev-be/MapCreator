[Setup]
AppName=MapCreator
AppVersion=1.0.0
DefaultDirName={autopf}\MapCreator
DefaultGroupName=MapCreator
OutputBaseFilename=MapCreator-Setup-winx86-1.0.0
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
SetupIconFile=Assets\MapCreator.ico

[Files]
Source: "bin\Release\net10.0-windows\win-x86\publish\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\MapCreator"; Filename: "{app}\MapCreator.exe"
Name: "{commondesktop}\MapCreator"; Filename: "{app}\MapCreator.exe"

[Run]
Filename: "https://go.microsoft.com/fwlink/p/?LinkId=2124703"; Description: "Zainstaluj WebView2 Runtime"; Flags: shellexec postinstall skipifsilent
Filename: "{app}\MapCreator.exe"; Description: "Launch MapCreator"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\wwwroot\dist"
Type: filesandordirs; Name: "{localappdata}\MapCreator"
