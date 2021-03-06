# 2장 HTML 개요

## 범위를 설정하는 태그
html : 파일 전체의 영역을 설정하는 태그  
head : 문서 정보의 범위를 정의하는 태그  
body : 문서 구조의 범위를 정의하는 태그

## DOCTYPE
마크업 언어에서 문서 형식을 정의하는 태그
```html
<!DOCTYPE html>
```

## 정보를 나타내는 태그
title : 웹 페이지의 제목을 나타내는 태그. 웹 브라우저의 각 탭에 표시된다.
```html
<head>
    <title>문성운 세상</title>
</head>
```
meta : 문서에 관한 정보를 검색엔진이나 브라우저에 제공하는 태그
```html
<head>
    <meta charset="UTF-8">
    <meta name="author" content="문성운">
    <meta name="description" content="문성운의 lerning-log">
</head>
```
link : 외부 문서를 연결할 때 사용하는 태그
```html
<head>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="icon" href="./favicon.png">
</head>
```

## 블록 요소와 인라인 요소
* 블록 요소
    + div, h, p
    + 사용 가능한 최대 가로 너비를 사용한다.
    + 크기를 지정할 수 있다.
    + 수직으로 쌓인다.
    + margin, padding 사용 가능하다.
    + 레이아웃을 위해 사용한다.

* 인라인 요소
    + span, img
    + 필요한 만큼(내부 content)의 너비를 사용한다.
    + 크기를 지정할 수 없다.
    + 수평으로 쌓인다.
    + margin, padding 위, 아래는 사용할 수 없다.
    + 텍스트를 작업할 때 사용한다.

css의 display 속성을 통해 block, inline을 변경할 수 있다.

```css
div {
    display: inline;
}

span {
    display: block;
}
```

## 웹 표준 검사하기
https://validator.w3.org/