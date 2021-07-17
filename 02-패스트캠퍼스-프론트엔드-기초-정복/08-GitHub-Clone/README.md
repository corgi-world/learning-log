# 8장 GitHub 따라 만들기

https://github.com/Heropcode/github-responsive

## meta 태그

* viewport : ```<meta name="viewport" content="a, b, c">```
    * ```content="width=device-width"``` 뷰 포트 너비를 장치의 너비로 지정
    * ```content="initial-scale=1"``` 초기 배율값을 1로 지정
    * ```content="user-scalabe=no"``` 유저가 배율을 변경하지 못하도록 지정
    * ```content="maximum-scale=1"``` 최대 배율을 1로 지정
    * ```content="minimum-scale=1"``` 최소 배율을 1로 지정

* og, twitter : SNS 공유 시 웹사이트 정보를 요약하여 미리보기를 설정
    * ```property="og:type" content="website"```
    * ```property="og:site_name" content="GitHub"```
    * ```property="og:title" content="Build software better, together"```
    * ```property="og:description" content="GitHub clone coding / GitHub is..."```
    * ```property="og:image" content="img/logo__github.png"```
    * ```property="og:url" content="https://github.com"```

    * ```property="twitter:card" content="summary"```
    * ```property="twitter:site" content="GitHub"```
    * ```property="twitter:title" content="Build software better, together"```
    * ```property="twitter:description" content="GitHub clone coding / GitHub is..."```
    * ```property="twitter:image" content="img/logo__github.png"```
    * ```property="twitter:url" content="https://github.com"```

## favicon

* ```<link rel="icon" href="favicon.png">```
* ```<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">``` (익스플로러)
* ```<link rel="apple-touch-icon" href="favicon.png">``` (아이폰)
* 익스플로러는 루트 경로에 favicon.ico 파일이 존재하면 자동으로 찾아 사용하기 때문에 link 태그 생략 가능

## 구글 폰트
https://fonts.google.com/

## reset.css
https://cdnjs.com/libraries/meyer-reset