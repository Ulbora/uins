//constants
/*     
 Copyright (C) 2012 Driven Solutions (www.drivensolutions.com)
 All rights reserved.
 
 Copyright (C) 2012 Ken Williamson
 All rights reserved.

Copyright (C) 2012 Chris Williamson
 All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
  
 Author: Ken Williamson (ken@drivensolutions.com) 
 */
//commands------------------------------------------------------------
var INSTALL = "install";
exports.INSTALL = INSTALL;

var HELP = "--help";
exports.HELP = HELP;

var H = "-h";
exports.H = H;



//messages-------------------------------------------------------------
var DESC = "uins is an application for installing node applications";
exports.DESC = DESC;

var INSTALL_COMMAND_SIGNATURE = "Install type: uins install nodeAppname ver=2.0(optional) path=/somePath(optional)";
exports.INSTALL_COMMAND_SIGNATURE = INSTALL_COMMAND_SIGNATURE;

var PRESS_RETURN = "press return";
exports.PRESS_RETURN = PRESS_RETURN;

var HELP_MESSAGE = "type: uin --help";
exports.HELP_MESSAGE = HELP_MESSAGE;




//returns --------------------------------------------------------------
var WINDOWS = "windows";
exports.WINDOWS = WINDOWS;

var LINUX = "linux";
exports.LINUX = LINUX;



//GitHub repository

var USE_GITHUB_TAG = false;
exports.USE_GITHUB_TAG = USE_GITHUB_TAG;


//var PROJECT_REPOSITORY_RELEASES = "https://api.github.com/repos/user/projectName/releases";
var PROJECT_REPOSITORY_RELEASES = "https://api.github.com/repos/Ulbora/ulboracms/releases";
exports.PROJECT_REPOSITORY_RELEASES = PROJECT_REPOSITORY_RELEASES;


var PROJECT_REPOSITORY_TAGS = "https://api.github.com/repos/user/projectName/tags";
exports.PROJECT_REPOSITORY_TAGS = PROJECT_REPOSITORY_TAGS;



//node application
var LINUX_APPLICATION_INSTALL_PATH = "/home/ken/ken1";// "var/www";
exports.LINUX_APPLICATION_INSTALL_PATH = LINUX_APPLICATION_INSTALL_PATH;

var WINDOWS_APPLICATION_INSTALL_PATH = "c:\nodeapps";
exports.WINDOWS_APPLICATION_INSTALL_PATH = WINDOWS_APPLICATION_INSTALL_PATH;


