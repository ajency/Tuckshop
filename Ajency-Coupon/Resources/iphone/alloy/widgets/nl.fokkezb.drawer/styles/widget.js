function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.drawer/" + s : s.substring(0, index) + "/nl.fokkezb.drawer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0001,
    key: "container",
    style: {
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true
    }
}, {
    isClass: true,
    priority: 10000.0002,
    key: "exit",
    style: {
        exitOnClose: true
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "ver",
    style: {
        layout: "vertical"
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "hor",
    style: {
        layout: "horizontal"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "bold",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold"
        }
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "italic",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontStyle: "italic"
        }
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "f-s1",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 5
        }
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "f-s1.3",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 8
        }
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "f-s2",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 10
        }
    }
}, {
    isClass: true,
    priority: 10000.001,
    key: "f-s3",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        }
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "f-s3.3",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        }
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "f-s4",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 20
        }
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "f-s5",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 25
        }
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "f-s6",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 30
        }
    }
}, {
    isClass: true,
    priority: 10000.0015,
    key: "f-s7",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 35
        }
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "f-s8",
    style: {
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 40
        }
    }
}, {
    isClass: true,
    priority: 10000.0017,
    key: "text-left",
    style: {
        textAlign: "left"
    }
}, {
    isClass: true,
    priority: 10000.0018,
    key: "text-center",
    style: {
        textAlign: "center"
    }
}, {
    isClass: true,
    priority: 10000.0019,
    key: "text-right",
    style: {
        textAlign: "right"
    }
}, {
    isClass: true,
    priority: 10000.002,
    key: "w-fill",
    style: {
        width: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "h-fill",
    style: {
        height: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0022,
    key: "w-size",
    style: {
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0023,
    key: "h-size",
    style: {
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0024,
    key: "w-auto",
    style: {
        width: "auto"
    }
}, {
    isClass: true,
    priority: 10000.0025,
    key: "h-auto",
    style: {
        height: "auto"
    }
}, {
    isClass: true,
    priority: 10000.0026,
    key: "left0",
    style: {
        left: 0
    }
}, {
    isClass: true,
    priority: 10000.0027,
    key: "left1",
    style: {
        left: "5%"
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "left2",
    style: {
        left: "10%"
    }
}, {
    isClass: true,
    priority: 10000.0029,
    key: "left3",
    style: {
        left: "15%"
    }
}, {
    isClass: true,
    priority: 10000.003,
    key: "left4",
    style: {
        left: "20%"
    }
}, {
    isClass: true,
    priority: 10000.0031,
    key: "left5",
    style: {
        left: "25%"
    }
}, {
    isClass: true,
    priority: 10000.0032,
    key: "left6",
    style: {
        left: "30%"
    }
}, {
    isClass: true,
    priority: 10000.0033,
    key: "right0",
    style: {
        right: 0
    }
}, {
    isClass: true,
    priority: 10000.0034,
    key: "right1",
    style: {
        right: "5%"
    }
}, {
    isClass: true,
    priority: 10000.0035,
    key: "right2",
    style: {
        right: "10%"
    }
}, {
    isClass: true,
    priority: 10000.0036,
    key: "right3",
    style: {
        right: "15%"
    }
}, {
    isClass: true,
    priority: 10000.0037,
    key: "right4",
    style: {
        right: "20%"
    }
}, {
    isClass: true,
    priority: 10000.0038,
    key: "right5",
    style: {
        right: "25%"
    }
}, {
    isClass: true,
    priority: 10000.0039,
    key: "right6",
    style: {
        right: "30%"
    }
}, {
    isClass: true,
    priority: 10000.004,
    key: "top0",
    style: {
        top: 0
    }
}, {
    isClass: true,
    priority: 10000.0041,
    key: "top1",
    style: {
        top: "5%"
    }
}, {
    isClass: true,
    priority: 10000.0042,
    key: "top2",
    style: {
        top: "10%"
    }
}, {
    isClass: true,
    priority: 10000.0043,
    key: "top3",
    style: {
        top: "15%"
    }
}, {
    isClass: true,
    priority: 10000.0044,
    key: "top4",
    style: {
        top: "20%"
    }
}, {
    isClass: true,
    priority: 10000.0045,
    key: "top5",
    style: {
        top: "25%"
    }
}, {
    isClass: true,
    priority: 10000.0046,
    key: "top6",
    style: {
        top: "30%"
    }
}, {
    isClass: true,
    priority: 10000.0047,
    key: "bottom0",
    style: {
        bottom: 0
    }
}, {
    isClass: true,
    priority: 10000.0048,
    key: "bottom1",
    style: {
        bottom: "5%"
    }
}, {
    isClass: true,
    priority: 10000.0049,
    key: "bottom2",
    style: {
        bottom: "10%"
    }
}, {
    isClass: true,
    priority: 10000.005,
    key: "bottom3",
    style: {
        bottom: "15%"
    }
}, {
    isClass: true,
    priority: 10000.0051,
    key: "bottom4",
    style: {
        bottom: "20%"
    }
}, {
    isClass: true,
    priority: 10000.0052,
    key: "bottom5",
    style: {
        bottom: "25%"
    }
}, {
    isClass: true,
    priority: 10000.0053,
    key: "bottom6",
    style: {
        bottom: "30%"
    }
}, {
    isClass: true,
    priority: 10000.0054,
    key: "row",
    style: {
        layout: "horizontal"
    }
}, {
    isClass: true,
    priority: 10000.0055,
    key: "span14",
    style: {
        width: "70%",
        left: "15%",
        right: "15%"
    }
}, {
    isClass: true,
    priority: 10000.0056,
    key: "span13",
    style: {
        width: "90%",
        left: "5%",
        right: "5%"
    }
}, {
    isClass: true,
    priority: 10000.0057,
    key: "span12",
    style: {
        width: "98%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0058,
    key: "span11",
    style: {
        width: "89.60%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0059,
    key: "span10",
    style: {
        width: "81.30%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.006,
    key: "span9",
    style: {
        width: "73%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0061,
    key: "span8",
    style: {
        width: "64.60%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0062,
    key: "span7",
    style: {
        width: "56.30%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0063,
    key: "span6",
    style: {
        width: "48%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0064,
    key: "span5",
    style: {
        width: "39.60%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0065,
    key: "span4",
    style: {
        width: "31.30%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0066,
    key: "span3",
    style: {
        width: "23%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0067,
    key: "span2",
    style: {
        width: "14.30%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0068,
    key: "span1",
    style: {
        width: "6.33%",
        left: "1%",
        right: "1%"
    }
}, {
    isClass: true,
    priority: 10000.0069,
    key: "keyboard-email",
    style: {
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    }
}, {
    isClass: true,
    priority: 10000.007,
    key: "keyboard-password",
    style: {
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    isClass: true,
    priority: 10000.0071,
    key: "border-rounded",
    style: {
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
    }
}, {
    isClass: true,
    priority: 10000.0072,
    key: "password",
    style: {
        passwordMask: true
    }
}, {
    isClass: true,
    priority: 10000.0073,
    key: "ts-logo",
    style: {
        image: "/images/tuckshopLogo.png",
        width: "45%",
        height: "29%"
    }
}, {
    isClass: true,
    priority: 10000.0074,
    key: "ts-brown",
    style: {
        color: "#3B0B0B"
    }
}, {
    isClass: true,
    priority: 10000.0075,
    key: "ts-yellow",
    style: {
        color: "#F0C60A"
    }
}, {
    isClass: true,
    priority: 10000.0076,
    key: "ts-bg-yellow",
    style: {
        backgroundColor: "#F0C60A"
    }
}, {
    isClass: true,
    priority: 10000.0077,
    key: "ts-bg-brown",
    style: {
        backgroundColor: "#3B0B0B"
    }
} ];