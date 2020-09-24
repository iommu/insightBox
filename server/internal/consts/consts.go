package consts

import (
	"fmt"
)

var (
	//Notif formatted string
	Notif = fmt.Sprintf(teal, fmt.Sprint("Notif :"))
	//Warn formatted string
	Warn = fmt.Sprintf(yellow, fmt.Sprint("Warn  :"))
	//Error formatted strin
	Error = fmt.Sprintf(red, fmt.Sprint("Error :"))
)

var (
	black   = "\033[1;30m%s\033[0m"
	red     = "\033[1;31m%s\033[0m"
	green   = "\033[1;32m%s\033[0m"
	yellow  = "\033[1;33m%s\033[0m"
	purple  = "\033[1;34m%s\033[0m"
	magenta = "\033[1;35m%s\033[0m"
	teal    = "\033[1;36m%s\033[0m"
	white   = "\033[1;37m%s\033[0m"
)
