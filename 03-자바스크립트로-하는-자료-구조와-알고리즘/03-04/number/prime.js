/*
    소수 : 약수가 1과 자기 자신뿐인 자연수
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...

    소인수분해 : 자연수를 소인수의 곱으로 나타낸 것
*/

// 시간 복잡도 : O(n)
function isPrime_1(n) {
    if (n <= 1) {
        return false;
    }

    for (var i = 2; i < n; i ++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

// 시간 복잡도 : O(sqrt(n))
// n의 제곱근이 소수가 아니면 n은 소수가 아니다.
// 따라서 반복문을 n의 제곱근까지만 확인해보면 된다.
function isPrime_2(n) {
    if (n <= 1) {
        return false;
    }

    for (var i = 2; i * i <= n; i ++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

// 소수 찾기 테스트
let res_1 = "";
for (var i = 0; i < 1000; i ++) {
    
    if (isPrime_1(i)) res_1 += i + " ";
}
let res_2 = "";
for (var i = 0; i < 1000; i ++) {
    
    if (isPrime_2(i)) res_2 += i + " ";
}

console.log("isPrime_1\n" + res_1);
console.log("isPrime_2\n" + res_2);

function primeFactors(n) {
    // n을 2로 최대한 나눈다.
    while (n % 2 == 0) {
        console.log(2);
        n = n / 2;
    }

    // 위 while 문을 통과하면 n은 무조건 홀수
    for (var i = 3; i * i <= n; i = i + 2) {
        while (n % i == 0) {
            console.log(i);
            n = n / i;
        }
    }

    if (n > 2) {
        console.log(n);
    }
}

primeFactors(10);