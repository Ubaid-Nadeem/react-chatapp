"use client";
import AppNavbar from "@/components/navbar/navbar";
import { useState } from "react";
import { Avatar, Separator, TextField } from "ui";

export default function Chats() {
  const [isChatting, setIsChatting] = useState(false);
  const [search, setSearch] = useState(false);
  const [chatWith, setChatWith] = useState({});

  return (
    <div className="flex mt-[56px] ">
      {/* uers sidebar */}

      <div
        className={`overflow-y-scroll w-full transition-transform sm:translate-x-0 z-40 side-bar-users sm:w-[25%] h-[calc(100vh-49px)]  ${
          isChatting ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="  p-3 flex justify-between items-center ">
          {search ? (
            <TextField placeholder="Search Name" className="w-[90%]" />
          ) : (
            <h2 className=" font-bold text-[18px] mt-2">Chats</h2>
          )}

          {search ? (
            <svg
              onClick={() => setSearch(!search)}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              className="justd-icons size-4 cursor-pointer"
              data-slot="icon"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m5 5 14 14m0-14L5 19"
              ></path>
            </svg>
          ) : (
            <svg
              onClick={() => setSearch(!search)}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              className="justd-icons size-5 cursor-pointer"
              data-slot="icon"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m20.25 20.25-4.123-4.123m0 0A7.25 7.25 0 1 0 5.873 5.873a7.25 7.25 0 0 0 10.253 10.253Z"
              ></path>
            </svg>
          )}
        </div>
        <Separator />

        <div className="mt-2  ">
          {/* user 1 */}
          <div
            onClick={() => setIsChatting(!isChatting)}
            className="flex items-center p-3  cursor-pointer hover:bg-gray-200"
          >
            <Avatar
              size="large"
              src="data:image/jpeg;base64,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"
            />
            <div className="flex flex-col ml-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold text-[#2f3542] text-[14px]">
                  M Ubaid
                </h3>
                <span className="text-[12px] text-[#57606f]">2:30</span>
              </div>
              <p className="text-[12px] text-[gray]">
                hello ubaid , how are you?
              </p>
            </div>
          </div>
          {/* user 2 */}
          <div
            onClick={() => setIsChatting(!isChatting)}
            className="flex items-center p-3  cursor-pointer hover:bg-gray-200"
          >
            <Avatar
              size="large"
              src="data:image/jpeg;base64,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"
            />
            <div className="flex flex-col ml-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold text-[#2f3542] text-[14px]">
                  Shahzain Tariq
                </h3>
                <span className="text-[12px] text-[#57606f]">2:30</span>
              </div>
              <p className="text-[12px] text-[gray] font-bold line-clamp-2">
                hello ubaid , how are you? han bhai kl chal raha ha? Islamabad
                ka plan ban raha ha
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator
        orientation="vertical"
        className="hidden h-[calc(100vh-49px)]  md:block"
      />
      {/* message container */}

      <div
        className={`absolute  md:relative left-0 w-full md:block transition-transform sm:translate-x-0 chats-container sm:w-[75%]  h-[calc(100vh-49px)] ${
          isChatting ? "block" : "hidden"
        }`}
      >
        {/* header */}
        <div className="header fixed w-full">
          <div className="flex items-center p-[10px]  bg-white">
            <svg
              onClick={() => setIsChatting(!isChatting)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="justd-icons size-4 cursor-pointer mr-3 block md:hidden"
              data-slot="icon"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m15 20-8-8 8-8"
              ></path>
            </svg>
            <Avatar
              size="large"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA8PDxIPEA8PDw8PDw0PEA8PDw8QFhEWFhURFRUYHSggGBolHRUVITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHx0tLSsrKy0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tKy0tLSsrLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQIFBgQDBwj/xABBEAABAwIEAgcFBQUHBQAAAAABAAIRAwQFEiExQWEGEyJRcYGRMkKhwdEjUrHh8AcUYoLxQ1Nyc6KywhYkJTOS/8QAGQEBAQEBAQEAAAAAAAAAAAAAAQACAwQF/8QAIxEBAQACAgICAgMBAAAAAAAAAAECEQMhEjETQTJhIkJRBP/aAAwDAQACEQMRAD8A0oCcJwmAvlvpEAnCYCcKCMJwpQiFJGEKUIhSRRCnCISkIRCmQlCkgiFKEKSBCRCmQkUJ5whVuN9ILazjr3w5wltNvaeR3xwHMqho/tFsye2KrBIAdlD2nzaVqYZWbkFyk91sQptVPY9I7OuQ2lXpOcdmk5SfDNEq3aUeimFMKIUwpVIKQSCkEgQolTSKUgVAr0Kg5ZqRKiVIpIKJUFMqJCkikpQlCiimnCSk9QE4UghQKE4TQpEmhMJRQiFKEQoFCRCkhKRhEKSFJCEQpIhCQIVXj+NUbKkalU66inTBGeo6Nmj58FbEL5f+0vNUvKdL3W2wI0nKXPMnl7LVrDHyuqMstTplekOJvu6wfoXVSMzBLgNAWsb3gfJcd419PKx7A10aMcwtDRGsToZJ35BfV+j/AETpW5FYzUrFo7TgIpiACGjy3VniGE0arYq0qb42zNBgr0fNJ1J05fBb3b2+Fuc4doOA7UjKYGncPP8AFbj9nPSes2sy0quNSlWJbSc4kmk8Ccon3YnTwXp0i6N0QCW02sI2LBCxpbVtatKq0n7NwfTcBABa7NBT5Y8k0zcMuO7+n6EapgLyt3hzWuGzgCPAiV7BeR6EgmEkwtI4SKaSkiVAqTlArKIpIKSCCkmnCkjCIUoThSecIXpCFJKE4QmpFCE0JQhOEwEQoFCcITSkYThCFIJQmhSKElJJSIhYm7sW3GJ16jyOqtG0WkEwHPyB8HkJlbZxgE9wWfssPLa93VqNac1zTe06aUzTp5pMbRoZ4DuWsfas+0v+pbNsh9VrfWDzHJWDarKrA5jg5p2cNln8fsLiq49VUptJfm6vqAeHF534cOBHNcOJUTbW1as1xp69lrDlpOdla19TKB3zHmV01j6gnl7p9JK7HAta9uafZnVfPMeYYHcD2hPeFY0bNtZj6ppl9TOf7YMe1oHtjMO2dl43lkWUHOeXw5mbKQJaOsygweO+nGFqYzG72znlcsdWPsHRsuNnZlxlxtqBJ7z1bVaBcOCMDba2aCDloUmyCHCWsAOo32XeF52wmhCUEiiUISDlAqblAoRIhCcIJAKUITCkUKQCkAnCdBCEL0hCdLaCaEIITCAmoBCE0ok0JpRIATQoFCITRCkiiE4RCki5sghc9k8dZXLxAztJmCMvVMXVCr67ftKjD/aNDuTmxkcPKB/9BMP6cL7q2qB1UvbTomcjesc0Ob94tBgDlCoumWNWjrR9PrQXtygUhBdJjLoPP0K78HwjqCHtLqlOHt6kZGFjxUMODonLGkeafSSmx1NxcHsc0DsBzXTvoOxBO28Lppqb+mZ6B3FNwdRc7KCR1T/szLj7pBBg+a8ekjRSqPDjnh1PRw4ZgYjbgq7CsMZc13SXUB2nNcA1tRrQCXOfl0+sLRYPQZiN8+o4OFJhdU5uHsMae6QXH+UrOfsY3rtreits6laUWu3PWVOcPqOe0HycFcBJo7vRShYFu6AEIhOFBEpKSRCiiQoEL0SLVmp5QpAJ5Uw1WkQCkApAJhqdIgFKEwEwE6BJKcISnihEJrDQQhOFAJoCEoJhKEwEgITShSEIRCakSEIhSJcWJ2xqBuTSozM5k7HaWnkfoeC9724FJhedY2HFx4BZ7oNida7fe1KzpDLk0aTBo2mxo4DnK1MdrenNhWMtbVdQqyx+xp1dJPHXjw/ovHHalu0VH56gh0R1riN9SAStH0k6N0rsZtWVBtUbvy8V846Q9EbukBNw19MmA3KQfT81vU9XpTO+5NqOne56zxSkh0tBG5B+q+rdC8ObQtGbZ6pc+o4bE5iAByA+Z4rC4NgootzAS7i4/GFu+iWL0qzHW7TFW2hj2HcggOD2947Ucj5TjK7vRksnftfBNEJhZASTShSCIRCFIiEoUoRCijCYCkAnCkUJgJhqkGpCICkAnCcKBQhOE1ByoQE1zdAmhCQESmmlEmhNKKUJoUCRKa477EqdEamXcGAiT9EybTrlV1zjNFhytcKjyYDGaknxWPx7pU9/YByUzILWzJH8R4+AVZhGJxXy8NHNMGSJmPku2HFP7MZ3KTps31H3ALnjLlLgGTt6cdlWdEKrba9uaDtG3RbWonh1jRD2eYAI8CuqniLW5jwcSTyJAWPxnEaQuGBz+rc53ZIdDmOnsuH3YIGpXbLGa1HHHz3bk+wF06LPdJ2tLZ3InLyXngePmpTDbiG1mmC/QNqRpP8ACeXpK67m3687y3l3Ljk7Ydds5VYKVsXPgQ3M49wWTwW6qW1Vt60DPUNR76Z/uyQGsP8ALl174WixwiqHB09XsymOMcY8lln15eGji5w5AQ1u3ADKrjxlPJbH1LA+kdteSKToqN9qi+G1BzA94cwrYlfHIZTIboTDXNcDDmkdnQ7j2Vp8C6YuYRTucz27CpvUb4/e/FGXFr0Mc9t5KF5W1yyq0Ppua9p2c0yPDkV6SuLZolKUSopBNIKQUAgJhSASgAmmmAoEEwmnCQSE0J0HCFIKCkFxdTTQEJBhNIJpRJhCEo0IQoK7FrvLlpt0dUmTxazif1zWZrWZL3EGQZiSSfBd1xXz16z50B6tvg3TTz1814UbuaxomMxpCqz+V0O/3NXs4sZpx5MrjbYxeKUSDrp2jMg8QFLDrcwyoCJp1O4zlI2V30ptw+k6q0atIkQNhKfR1gNLYdrLwHEH6Lfh2x891t1Xth1tM9p7CR7VMkOHgVkK2A06b9i7OCHGoC4kzvJK+jlsNy6aSqHEmCW6DUu+OvzTcWMebd9KHDbNoLWVCS0mGPOmVwOjXGduf6Nkcfdhxqtc4vY9p6u3iXtfOsHbJGo9PD2p0w0sPAvIOkbxC8qWCNNavXf2nOezK07NaHgAA+AA8keEpvNpl7jG7+uZLabASXN7DczQdNz4LktLK4mXHrG6kwQXjU6j0Oi1NxbNzARwC68IoNLhpwd+KtLykm2dq0HBwJn2R7u4kuErnrUyCYB0J3C22JWrcu361VBc27esDY3zH47IuLePNHThN7Wokmm9zCSJHA+IOhW6wDF/3lrg/KKrIzNGgLT7wHjI/qsxa2rYOukF2u0TuvHCr3q7mm4aA1A13Nj9PTY+S58nH1t0w5PK9PocpqCkCvHt1TCkFEKYWgkFMKAU0gBSCAmkBCFIJBJKSaUrU0gU153cwpKKkClk04SCaQaSaEol516mRj3fda4+gXouDG6obRI++5rB5n6ArWM3dC9RTULUhmo1Ikn+izmNXP7vd2VTYOqVKTieAc0j8Y9FrqbxIaCPZCxf7SG/YNqD2qVVrweI1H1X0NPDOS26roxC5k16ZPZcxtVoGaIO/wAZXB0fvS1uSfZc3g7aT9UqFU12WtYa52PY7XYE8fAyF42dq4POm5bOo5rFt29Mwx017rvmdfFZzE7+GxOxeNc08Fc0qRIHgDuO7xWaxOkZOnE8RxCbaMMMNve2v8zBrs8HjppPFX9xcQHGBs6fI5gsZhwdDmwffiAT7sBaeuM2YdwdI7gZ+ipazlx41XXt5qIaNp/1Fe+C3mvuj2uI7zz5hUd+YcP5h/qP1XRgR1bvuRt/ED9ETK7bvFjppbu6lrpy9+6zF1exXYYBh7BI5kK8umHq3GD3zHgsXnmoSdO20gnSIhNtZnHi01/jDW07mNCGNpt8wXPPpA80ZCQDqCabDpwjmss55qVKjZnrq9Kg0ctC8+mi3YEEAD3PgnW3PymHUbqg/M1rvvNa71Er1AXHhbpo0f8ALaPQR8l2BfN9PYm1egXmFNqUmFIBRCmFpmpBNIJrUZpgJgICaQaEIUlWFIKKAV5noTQEgmFqBMISBTlQNCSEg1nulVeHUWDX2nkfAfNaGVlsbGe64wxrW/P/AJLrxzeQtknbgbdfbOGsBusH5eSzvSi76yjVZIMtJ10O+h+CtKZ+2rRuPEcfzKzmNMILgY9mOW08PFeu2uUwxsd3QGl1toWn2adxVaP8JbTf+Lir+rSpsBOVoLe7STuFVfszAFs8SI6+q4xxMMHyC6Mfq6mJ/hb3jmtX1ty4r34034wBJboNABEE76idhzVXZh1Y1idQA+CY3yE6Kse9ziYMudvPHxV9gFD3QZBnrDzIIj9f0JdtcmGp04MPojrABMZ4WpfhrWmrUBdLmO00gaHz4Df5rJYZcfbsG/aAO/FbWvcDK7fUOHDuPPmtTTjl5bZzEbSXtE7u183ALzps6o5hoWlx1110ldVeux1Rgn+0+GYT+C4sYBb6aDi7vCLpvHyvVSrYtnGQjsvBAc3QgggRvzCq7m26nMQS73zOuUb7LgbcODhtrpO0KxxGpltatQxOUU4OvacQ35rPt0usYp8EqTcskewHPI7qj3Au9NB5LY0K+ao4TtSGg8Fhuj9GXlxIJzN48ZW1wuiTUqngABuI9kJ2MMZrdbno0/Na0j/jGv8AjKtAqborpbNHc94+KuAV8/L3XperVNoXm0r1CUYXoFAKYSzUgEwEgmtRlMJqMqQSBCE0KSqQkE15npSCaiCmEipBSUQmClk00kJBrNtfmq1n/wATo+Svrurkpvf91jj8FicOu+y8ydZ38V6P+f3tx5sbcenlhbw6vc6DcN/Xqs10pytdI94n1XZg+IRcXHHUmJ37Koelt3me0bQvVbK88mWM2veh1TqrMOMw64qjx1/JW1xR67xiZ2XLhlr/AOKoOYJ2qubxMuJdHPU+is8IAyQY30M6Hwngn9H68p9KQYbrPr3u5/krLD2BjXEaAHf7ys74MDSZEgdnbUqjxSvoGNkuEiB757x9f0SzTpx8nl7Zi2qllzTgwDWGx7wQFsnViQ/U+yePEgwspStx+80QQJ6+mIEATqtfTwwUw4jOc7m6F0hpLmzHH9aIkoueO2Z68/vFKTIDh4e0VbXlDOROsjTvnuVRiNHI8OiMoBkSTx1Vxh9UPDWnV447gQP6aojpcp7Z/EbEsfJG/tdw5rlx6tFqWd76YHONZ+C2OMUKbmcJiDBWA6Q1JptGujwOWzoK1rThcvPt19DrfNLth1g9BC3PR+i3K4/ee8+QcQPwWL6LVhTolx37Tlrejd19lT09yTPeUzTNmVk01nR3/wBbxtlqu+IBVsqPoxWzfvA07NRp0IO4P0V4vn8v517cPxm02r0avMKbVmNPQKYXmFNq0zXoEwohMLUZTCkFEJpCSSEKSpRKSF5XpSUgohMJSaYUUwtRmpISTUFV0oq5bWpG7srfU/QFZKzpEU3SJ4cDwWl6Vv7FJn3nyfIR81XsoN6vbeSvZwY/x24cvL49PnFq+Li4B5D/AFfRUuPVZqETsFo6NGL+4ZPuNd+vVUGO03h76kRTLnU6ZIEPc3Lmy98Zh6rrrVc7nvDT6L0brhuH2zT/AHbe7iSuZl+GwA4gZh2ZgalQw15FjS5U2934LO1qzw6J2cBsO/wTcjjxdN1Y1W1acvlxk8TtsvDGOrpCRAdDRPGIJyrn6OvcWmTp4DmPkqfpTfuzECILtNBtH5q8uh8Oq5cLeH3lLXQVM3oPzW8uaoDW7e4d/wCNuq+cYEftqboE5nSeXZK093cnI7Q6BvemZMXi3XNidRpcIIMCOHgvbBbZh1nhMdkxy1G08Fnq94QSI2jjHAKxwm5I3Hug+qJl23eK60s8eYGMBaROxENj4BZjFrPrLSo5gzmm5tVxbqWtBLXOPISrbGq8tA9NVyMvDb2lyTvUoPpDfepDPwJKrl/gnHqdqK1eRQcJ3Eepj5rXdHx9m3vy+KydN5/d27AuqNA0E9/yW/wCj9mDPf8AJUh+SSLjogSKty0zqGOEiNiR81qVmsCaG3LwONI/7mlaVeLmms3owy8sdpBTaoAKYWI0mpNKgpNWma9QmohSTBUgpKAUgtMpISTUlOCmkheV6TBUpQhMFSBUkIShKAUIWmWV6XXOWtRbwbTLvMkx/tXmboZBpsO/4oQvbw3+LzcuMtYO6dlxKq73TRPw2/Bc/SkS/Crf3Ta0qp/zLiq57/khC1l+Uc5NY1tjaBlq1ukRp4cFla9kcztB7RO54EpIWsoePO6a/ArMMpuPM8fqsZj7JqRro507b6IQqwzK20sHoFtWjzNTu07IV5UsTTpv7TnZnB2oGkuc7zOvoAmhUW7tm7ilL3a906chzVjYUNJn3WoQsx03dFilIkaHh3Dlz5rl6R0stnx16rj3uBQhajnlldM5QrS2k3uqE/AL6dgtYCm0QTv3BCExymMsWmFXH/eUxEZ2vEzOzCf+IWrQhePn/N6+KaxSCkChC5RtIFTCELSSBUwUkJZSCkCmhMAlNCEh/9k="
            />
            <div className="flex flex-col ml-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold text-[#2f3542] text-[16px]">
                  M Ubaid
                </h3>
              </div>
            </div>
          </div>
          <Separator />
        </div>

        {/* chats */}
        <div className="messages-container"></div>

        {/* input container */}
        <div>
          <div className="input-container fixed bottom-0 p-2 w-full flex items-center gap-5  bg-[#3c6382] ">
            <input
              type="text"
              placeholder="Enter a Message"
              className="w-[90%] p-2 outline-none focus:outline-hidden rounded"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="justd-icons size-5 cursor-pointer text-white font-bold"
              data-slot="icon"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 12h3.25M6 12 3.382 4.145a.5.5 0 0 1 .698-.605l16.026 8.013a.5.5 0 0 1 0 .894L4.08 20.46a.5.5 0 0 1-.698-.605z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
