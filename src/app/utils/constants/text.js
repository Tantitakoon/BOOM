'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var TEXT_TH = {
    BALANCE_PRE_PAID: 'ยอดเงินคงเหลือ',
    BALANCE_POST_PAID: 'ยอดรวมปัจจุบัน',
    BAHT: 'บาท',
    USER_USE_INTERNET: 'คุณมียอดอินเตอร์เน็ตคงเหลือ',
    BALANCE: 'คงเหลือ',
    FROM_ALL: 'จากทั้งหมด',
    WELCOME_FIRSTTIME: ['สวัสดีฮะ มีอะไรให้อุ่นใจรับใช้ฮับ', 'สวัสดีฮะ อุ่นใจยินดีรับใช้', 'สวัสดีฮะ อุ่นใจยินดีให้บริการ', 'สวัสดีฮะ มีอะไรให้อุ่นใจช่วยดีฮับ', 'สวัสดีฮะ อุ่นใจพร้อมช่วยเหลือ', 'สวัสดีฮะ วันนี้มีอะไรให้อุ่นใจช่วยเหลือฮับ'],
    WELCOME_NOT_FIRSTTIME: ['สวัสดีฮะ มีอะไรให้อุ่นใจรับใช้เพิ่มเติมฮับ', 'สวัสดีฮะ อุ่นใจยินดีรับใช้เพิ่มเติม', 'สวัสดีฮะ อุ่นใจยินดีให้บริการเพิ่มเติม', 'สวัสดีฮะ มีอะไรให้อุ่นใจช่วยเพิ่มเติมดีฮับ', 'สวัสดีฮะ อุ่นใจพร้อมช่วยเหลือเพิ่มเติมคับ', 'สวัสดีฮะ วันนี้มีอะไรให้อุ่นใจช่วยเหลือเพิ่มเติมฮับ'],
    FALLBACK: ['อุ่นใจไม่เข้าใจฮะ พูดใหม่ได้ไหมฮับ', 'อะไรนะฮะ พูดใหม่ได้ไหมฮับ', 'ขอโทษฮะ ลองพูดอีกครั้งได้ไหมฮับ', 'ขอโทษฮะ พูดอีกครั้งได้ไหมฮับ', 'พูดอีกทีได้ไหมฮะ', 'ขอโทษฮะ อุ่นใจไม่เข้าใจ', 'ขอโทษฮะ อะไรนะฮับ', 'อีกทีได้ไหมฮะ', 'ว่ายังไงนะฮะ', 'ช่วยพูดอีกทีได้ไหมฮะ', 'อุ่นใจไม่เข้าใจฮะ พูดอีกทีได้มั้ยฮะ', 'อุ่นใจฟังไม่ทันฮะ พูดอีกทีได้มั้ยฮะ', 'ลองใหม่อีกทีได้ไหมฮะ', 'ให้อุ่นใจช่วยอะไรนะฮับ', 'คุณต้องการอะไร', 'พูดความต้องการของคุณใหม่อีกครั้ง'],
    AIS_PLAY_AGAIN: 'มีอะไรให้อุ่นใจช่วยเพิ่มเติมไหมฮับ',
    AIS_SERVICES: 'บริการ AIS',
    MY_AIS_SERVICES: 'บริการ my AIS',
    MY_AIS_SERVICES_DESCRIPTION: 'my AIS, ง่ายกับทุกธุรกรรมออนไลน์ ไม่ว่าเวลาไหน',
    AIS_PLAY_SERVICES: 'บริการ AIS PLAY',
    AIS_PLAY_SERVICES_DESCRIPTION: 'พบกับความบันเทิงระดับโลกที่ AIS PLAY ทั้งหนัง ซีรี่ส์ การ์ตูน กีฬา ข่าว และคาราโอเกะ ที่คัดสรรมาพิเศษเพื่อคุณ \nคุณสามารถเริ่มต้นป้อนคำสั่งพื้นฐานด้วยเสียง โดยลองพูดคำว่า ดูไทยรัฐ หรือ เล่นไฮไลท์ ของเดือนนี้ \nเลื่อนตัวเลือก ด้านล่าง',
    AIS_PLAY_TUTORIAL: 'ตัวอย่างคำสั่ง ที่คุณสามารถสั่งใช้งานบน AIS PLAY ลองพูดคำสั่งแบบนี้ดูซิ\n1. ดูทีวี , เปิดทีวี\n2. เล่นหนัง , เปิดภาพยนตร์\n3. เล่นซีรีส์ , เปิดซีรีส์\nเลื่อนตัวเลือก ด้านล่าง',
    AIS_PLAY_TUTORIAL_SUGGESTION: ['ดูทีวี', 'เล่นหนัง', 'เล่นซีรี่ส์'],
    AIS_PLAY_TUTORIAL_NEXT: 'ลองพูดคำว่า...',
    AIS_PLAY_TUTORIAL_CHANNEL: 'ดูช่องสาม หรือ ดูช่องเวิร์กพอยซ์',
    AIS_PLAY_TUTORIAL_MOVIE: 'ดูวอร์คราฟ หรือ ดูวันเดอร์วูเม่น',
    AIS_PLAY_TUTORIAL_SERIES: 'ดูเกมออฟโทรน หรือ ดูพริชเซินเบรค',
    AIS_PLAY_TUTORIAL_CHANNEL_SUGGESTION: 'ดูทีวี',
    AIS_PLAY_TUTORIAL_MOVIE_SUGGESTION: 'เล่นหนัง',
    AIS_PLAY_TUTORIAL_SERIES_SUGGESTION: 'เล่นซีรี่ย์',
    AIS_PLAY_SEARCH: 'นี่คือผลการค้นหา',
    BALANCE_SUGGESTION: 'บริการเช็กยอด',
    PACKAGE_SUGGESTION: 'แพ็กเกจเสริม',
    INTERNET_SUGGESTION: 'เช็กเน็ต',
    CURRENT_PACKAGE_SUGGESTION: 'โปรปัจจุบัน',
    NO_USED_INTERNET_DATA: '\u0E04\u0E38\u0E13\u0E44\u0E21\u0E48\u0E21\u0E35\u0E41\u0E1E\u0E47\u0E01\u0E40\u0E01\u0E08\u0E2D\u0E34\u0E19\u0E40\u0E15\u0E2D\u0E23\u0E4C\u0E40\u0E19\u0E47\u0E15 \u0E2A\u0E19\u0E43\u0E08\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E41\u0E1E\u0E47\u0E01\u0E25\u0E2D\u0E07\u0E1E\u0E39\u0E14 "\u0E0B\u0E37\u0E49\u0E2D\u0E41\u0E1E\u0E47\u0E01"',
    FALLBACK_WELCOME: 'บริการอื่นๆ',
    PACKAGE_FOR_YOU: 'แพ็กเกจเสริมสำหรับคุณ',
    NO_PACKAGE_FOR_YOU: 'ไม่มีแพ็กเกจเสริมสำหรับคุณ',
    NOT_ENOUGH_MONEY: 'ยอดเงินไม่พอใช้บริการ',
    NOT_POSTPAID: 'เบอร์ของคุณไม่ได้เป็นแบบรายเดือน',
    AIS_PLAY_READY: 'จัดให้เลย',
    AIS_PLAY_WELCOME: 'อุ่นใจพร้อมช่วยเหลือฮับ',
    SERVICE_ERROR: 'ขอโทษฮับ ระบบไม่สามารถให้บริการได้ในขณะนี้ กรุณาเข้าใช้บริการใหม่ภายหลัง',
    AUTH_FAIL: 'เกิดข้อผิดพลาดในการยืนยันตัวตน',
    NO_PACKAGE_THIS_TIME: 'คุณไม่มีแพ็กเกจในตอนนี้',
    CURRENT_MAIN_PRO: 'คุณใช้',
    VALID_UNTIL: 'ใช้ได้ถึงวันที่',
    COMMAND_NOT_FOUND: 'คำสั่งผิด',
    BUY_PACKAGE: 'จัดให้ ยืนยันการซื้อแพ็กและรอรับ SMS ยืนยันได้เลย',
    BUY_PACKAGE_FAIL: 'พบปัญหาระหว่างทำรายการ ลองใหม่อีกครั้งนะฮับ',
    NOT_FOUND: 'ไม่พบ',
    SEARCH_NOT_FOUND: 'ไม่พบสิ่งที่คุณค้นหา',
    NO_OUTSTANDING_BALANCE: 'ไม่มียอดค้างชำระ',
    OUTSTANDING_BALANCE: 'คุณมียอดค้างชำระ',
    FALLBACK_PACKAGE: 'ซื้อแพ็กเกจเสริมอื่น ๆ',
    FALLBACK_BALANCE: 'เช็กเน็ตคงเหลือ',
    FALLBACK_BILL_PAYMENT: 'จ่ายบิล',
    FALLBACK_TOP_UP: 'เติมเงิน',
    FALLBACK_OTHER_SERVICE: 'บริการอื่น ๆ จาก my AIS',
    EXIT: ['บายครับ', 'แล้วพบกันใหม่นะคับ', 'บายครับ มีอะไรให้ช่วยบอกได้นะครับ', 'แล้วกลับมาใหม่นะคับ', 'ไว้มาเล่นด้วยกันอีกนะครับ']
};

var TEXT_EN = {
    BALANCE_PRE_PAID: 'Balance is',
    BALANCE_POST_PAID: 'Remaining',
    BAHT: 'baht',
    USER_USE_INTERNET: 'Your remaining data is',
    BALANCE: 'balance',
    FROM_ALL: 'from all',
    WELCOME_FIRSTTIME: ['Hey, what can Oohnnjai help you?', 'Sawasdee hub, Oohnnjai\'s pleased to help you.', 'Sawasdee hub, Oohnnjai\'s pleased to do anything for you.', 'Sawasdee hub, What Oohnnjai can do for you?', 'Sawasdee hub, I\'m ready for helping.', 'Sawasdee hub, What Oohnnjai can help you today?'],
    WELCOME_NOT_FIRSTTIME: ['Hey, how can Oohnnjai help you?', 'Sawasdee hub, Oohnnjai\'s pleased to help you.', 'Sawasdee hub, Oohnnjai\'s pleased to do anything for you.', 'Sawasdee hub, What can Oohnnjai do for you?', 'Sawasdee hub, Oohnnjai is ready to help.', 'Sawasdee hub, how can Oohnnjai help you today?'],
    FALLBACK: ['Say what do you want again.', 'What do you want?', 'What you would like to let Oohnnjai help you?', 'Could you please try again?', 'Oohnnjai doesn\'t get, can you say it again?', 'Pardon, can you say it again?', 'Excuse me, could you try to say it again?', 'Excuse me, can you say it again?', 'Can you say it again?', 'Excuse me, Oohnnjai doesn\'t get it.', 'Excuse me, Pardon?', 'Can you repeat it again?', 'Pardon?', 'Can you say it again?', 'Oohnnjai doesn\'t get, could you repeat it again?', 'Oohnnjai cannot reach it, could you repeat it again?'],
    AIS_PLAY_AGAIN: 'Are there anything else you need Oohnnjai to help?',
    AIS_SERVICES: 'AIS Service',
    MY_AIS_SERVICES: 'my AIS Service',
    MY_AIS_SERVICES_DESCRIPTION: 'my AIS, Easy for all transactions. Anytime. Anywhere.',
    AIS_PLAY_SERVICES: 'AIS PLAY Service',
    AIS_PLAY_SERVICES_DESCRIPTION: 'AIS PLAY enjoy every moment. Let\'s experience endless joy and unlimited World Class Entertainment. Here are some things you can try saying to get started. Watch Thairath TV or Play Highlight of The Month. Swipe to see more options',
    AIS_PLAY_TUTORIAL: 'Here are some things you can ask for:',
    AIS_PLAY_TUTORIAL_SUGGESTION: ['Watch a TV Channel', 'Play a Movie', 'Play a TV Series'],
    AIS_PLAY_TUTORIAL_NEXT: 'Try saying...',
    AIS_PLAY_TUTORIAL_CHANNEL: '"Watch Channel 3" or "Watch Workpoint Channel"',
    AIS_PLAY_TUTORIAL_MOVIE: '"Watch Warcraft" or "Watch Wonder-woman"',
    AIS_PLAY_TUTORIAL_SERIES: '"Watch Game of thrones" or "Watch Prison Break"',
    AIS_PLAY_TUTORIAL_CHANNEL_SUGGESTION: 'Watch Channel',
    AIS_PLAY_TUTORIAL_MOVIE_SUGGESTION: 'Play Movie',
    AIS_PLAY_TUTORIAL_SERIES_SUGGESTION: 'Play Series',
    AIS_PLAY_SEARCH: 'This is what I\'ve found',
    BALANCE_SUGGESTION: 'Check Balance',
    PACKAGE_SUGGESTION: 'On-Top Packages',
    INTERNET_SUGGESTION: 'Remaining Net',
    CURRENT_PACKAGE_SUGGESTION: 'Current Package',
    NO_USED_INTERNET_DATA: 'You don\u2019t have data plan. To buy some packages just say "Buy packages"',
    FALLBACK_WELCOME: 'my AIS Service.',
    PACKAGE_FOR_YOU: 'Package For You.',
    NO_PACKAGE_FOR_YOU: 'Not Has Package.',
    NOT_ENOUGH_MONEY: 'The amount is not enough.',
    NOT_POSTPAID: 'Not postpaid type.',
    AIS_PLAY_READY: 'Here you are',
    AIS_PLAY_WELCOME: 'Hey, I\'m ready for helping.',
    SERVICE_ERROR: 'Sorry, the service is not available at this time. Please try again later.',
    AUTH_FAIL: 'Authentication failed',
    NO_PACKAGE_THIS_TIME: 'No package this time',
    CURRENT_MAIN_PRO: 'Your current package is',
    VALID_UNTIL: 'Valid until',
    COMMAND_NOT_FOUND: 'Command not found.',
    BUY_PACKAGE: 'Here you are. Confirm buying package. Confirmation transaction will be sent by SMS.',
    BUY_PACKAGE_FAIL: 'Transaction has not been done. Please try again.',
    NOT_FOUND: 'Not found',
    SEARCH_NOT_FOUND: 'Search not found',
    NO_OUTSTANDING_BALANCE: 'No outstanding balance',
    OUTSTANDING_BALANCE: 'Your current outstanding balance is',
    FALLBACK_PACKAGE: 'Package',
    FALLBACK_BALANCE: 'Balance',
    FALLBACK_BILL_PAYMENT: 'Bill Payment',
    FALLBACK_TOP_UP: 'Top up',
    FALLBACK_OTHER_SERVICE: 'Other service',
    EXIT: ['See you soon.', 'See you then.', 'See you around.', 'Until the next time.']
};

var getTextLanguage = exports.getTextLanguage = function getTextLanguage(type) {
    var LOCAL_LANG = '';
    var TEXT = {};
    if (['en', 'en-us', 'en-uk'].indexOf(type) > -1) {
        LOCAL_LANG = 'en';
        TEXT = TEXT_EN;
    } else if (type === 'th') {
        LOCAL_LANG = 'th';
        TEXT = TEXT_TH;
    } else {
        LOCAL_LANG = 'en';
        TEXT = TEXT_EN;
    }
    return _extends({}, TEXT, {
        LOCAL_LANG: LOCAL_LANG
    });
};