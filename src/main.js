/* eslint-disable no-unused-vars */
const fs = require('fs')
const { dialog } = require('electron').remote

function example () {
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      document.getElementById('in-scriptTextbox').value = '말하기 안녕하세요, 한글스크립트를 제작중인 PMH Studio / PMH입니다!\n말하기 오늘부터 제가, 한국어로, 한글로 된 프로그래밍 언어를 만들어 볼껀데요\n말하기 일단 프로토타입인 이 한글스크립트가 잘되서 다행이네요\n끝내기\n'
      break
    case 1:
      document.getElementById('in-scriptTextbox').value = '* 이것은 if문을 우리말로 번역한것입니다.\n\n* "만약 <숫자>보다 <숫자>가 <비교연산자>하다면 <줄번호> 아니면 <줄번호>"\n\n* 잘 됬으면 좋겠네요\n\n만약 5보다 2가 크다면 8 아니면 10\n말하기 5보다 2가 큽니다\n뛰어넘기 1\n말하기 5보다 2가 작습니다\n끝내기\n'
      break
    case 2:
      document.getElementById('in-scriptTextbox').value = "* 변수를 만들고, 불러오는 기능을 만들었습니다\n\n* 변수는 '정하기'로 만들고, '말하기' 와 '만약 ~'에서 쓸수있습니다\n\n정하기 x 10\n정하기 y 50\n만약 x가 y보다 크다면 8 아니면 13\n말하기 변수, x\n말하기 (이)가\n말하기 변수, y\n말하기 보다 더 큽니다\n뛰어넘기 4\n말하기 변수, y\n말하기 (이)가\n말하기 변수, x\n말하기 보다 더 큽니다\n끝내기\n"
      break
    case 3:
      document.getElementById('in-scriptTextbox').value = '* 변수를 연산하여 대입하기를 우리말로 번역한 것입니다\n* 쉽기떄문에 봐도 바로 알수있습니다\n\n정하기 x 10\n\nx 에 1 더하기\n말하기 변수, x\n\nx 에 2 빼기\n말하기 변수, x\n\nx 에 3 곱하기\n말하기 변수, x\n\nx 에 3 나누기\n말하기 변수, x\n끝내기\n'
      break
    case 4:
      document.getElementById('in-scriptTextbox').value = "ㅈ 이것은 비교연산문.kost를 '줄임말' 방식을 사용해 구현한 것입니다\n\nㅈ ㅈ은 주석, ㅁ는 말하기, ㄲ는 끝내기, ㅎ는 만약, ㄸ는 뛰어넘기를 뜻합니다\n\n\n\nㅎ 5보다 2가 크다면 8 아니면 10\nㅁ 5보다 2가 큽니다\nㄸ 1\nㅁ 5보다 2가 작습니다\nㄲ\n"
      break
  }
}

function $export () {
  dialog.showSaveDialog({
    defaultPath: document.getElementById('in-fileName').value || '이름없음',
    buttonLabel: '한글스크립트 파일 저장하기',
    filters: [{ name: '한글스크립트 파일', extensions: ['kost'] }, { name: '일반 텍스트 파일', extensions: ['txt'] }]
  }, (filename) => {
    if (filename) {
      fs.writeFile(filename, document.getElementById('in-scriptTextbox').value, (err) => {
        if (err) { console.log(err) }
      })
    }
  })
}

function $import () {
  dialog.showOpenDialog({
    buttonLabel: '한글스크립트 파일 불러오기',
    filters: [{ name: '한글스크립트 파일', extensions: ['kost'] }, { name: '일반 텍스트 파일', extensions: ['txt'] }],
    openFile: true,
    openDirectory: false,
    multiSelections: false
  }, (filedir) => {
    if (filedir) {
      document.getElementById('in-fileName').value = filedir[0].split('\\')[(filedir[0].split('\\').length) - 1].split('.')[0]
      fs.readFile(filedir[0], 'utf8', (err, data) => {
        if (err) { console.log(err) } else {
          document.getElementById('in-scriptTextbox').value = data
        }
      })
    }
  })
}

function reset () {
  document.getElementById('in-scriptTextbox').value = ''
}

function run () {
  document.getElementById('in-debugTextbox').value = ''
  let $한글스크립트 = document.getElementById('in-scriptTextbox').value.split('\n')
  let $메모리버퍼 = {
    '$한글스크립트': $한글스크립트
  }
  let $한글한글 = Array
  for (let $계수기 = 0; $계수기 < $한글스크립트.length;) {
    $메모리버퍼.$계수기 = $계수기
    $한글한글 = $한글스크립트[$계수기].startsWith('만약') || $한글스크립트[$계수기].startsWith('ㅎ') ? $한글스크립트[$계수기].split('을 ').join(' ').split('를 ').join(' ').split('가 ').join(' ').split('이 ').join(' ').split('보다 ').join(' ').split(' ') : $한글스크립트[$계수기].split(' ')
    $메모리버퍼.$한글한글 = $한글한글
    if (!$한글스크립트[$계수기]) {
      $계수기++
    } else {
      if (!$메모리버퍼[$한글한글[0]]) {
        if ($한글한글[0] === '말하기' || $한글한글[0] === 'ㅁ') {
          if (!$한글한글.slice(1).join(' ')) {
            document.getElementById('in-debugTextbox').value += '\n'
          } else if ($한글스크립트[$계수기].includes('변수,')) {
            document.getElementById('in-debugTextbox').value += $메모리버퍼[$한글한글[2]] + '\n'
          } else {
            document.getElementById('in-debugTextbox').value += $한글한글.slice(1).join(' ') + '\n'
          }
          $계수기++
        } else if ($한글한글[0] === '*' || $한글한글[0] === 'ㅈ') {
          $계수기++
        } else if ($한글한글[0] === '끝내기' || $한글한글[0] === 'ㄲ') {
          $계수기 = ($한글스크립트.length)
        } else if ($한글한글[0] === '만약' || $한글한글[0] === 'ㅎ') {
          let $비교되는자 = $한글한글[1]
          let $비교하는자 = $한글한글[2]
          let $연산자 = $한글한글[3]
          let $같다면여기로 = Number($한글한글[4]) - 1
          let $아니면여기로 = Number($한글한글[6]) - 1
          if (!$비교되는자 || !$비교하는자 || !$연산자 || !$같다면여기로 || !$아니면여기로) {
            document.getElementById('in-debugTextbox').value += '알수없는 문법! ' + ($계수기 + 1) + '번째 줄, "만약 <숫자/변수이름>가 <숫자/변수이름>보다 크다면 <이동할 줄> 아니면 <이동할 줄>"을 사용하세요'
          }
          if (!Number($비교되는자)) {
            if (!$메모리버퍼[$비교되는자]) {
              document.getElementById('in-debugTextbox').value += '선언되지 않은 변수이름! (혹은 문법오류) ' + ($계수기 + 1) + '번째 줄, "만약 <숫자/변수이름>가 <숫자/변수이름>보다 크다면 <이동할 줄> 아니면 <이동할 줄>"을 사용하세요'
            } else {
              $비교되는자 = $메모리버퍼[$비교되는자]
            }
          }
          if (!Number($비교하는자)) {
            if (!$메모리버퍼[$비교하는자]) {
              document.getElementById('in-debugTextbox').value += '선언되지 않은 변수이름! (혹은 문법오류) ' + ($계수기 + 1) + '번째 줄, "만약 <숫자/변수이름>가 <숫자/변수이름>보다 크다면 <이동할 줄> 아니면 <이동할 줄>"을 사용하세요'
            } else {
              $비교하는자 = $메모리버퍼[$비교하는자]
            }
          }
          if ($연산자 === '같다면') {
            if ($비교되는자 === $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else if ($연산자 === '다르면') {
            if ($비교되는자 !== $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else if ($연산자 === '크다면') {
            if ($비교되는자 < $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else if ($연산자 === '작다면') {
            if ($비교되는자 > $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else if ($연산자 === '같거나크다면' || $연산자 === '크거나같다면') {
            if ($비교되는자 <= $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else if ($연산자 === '같거나작다면' || $연산자 === '작거나같다면') {
            if ($비교되는자 >= $비교하는자) {
              $계수기 = $같다면여기로
            } else {
              $계수기 = $아니면여기로
            }
          } else {
            document.getElementById('in-debugTextbox').value += '알수없는 연산자! ' + ($계수기 + 1) + '번째 줄, ' + $연산자 + ', 같다면/다르면/크다면/작다면/같거나크다면/같거나작다면 을 사용하세요'
            $계수기++
          }
        } else if ($한글한글[0] === '뛰어넘기' || $한글한글[0] === 'ㄸ') {
          let $얼마나뛰어넘기 = Number($한글한글[1])
          if (!$얼마나뛰어넘기) {
            document.getElementById('in-debugTextbox').value += '알수없는 문법! ' + ($계수기 + 1) + '번째 줄, "뛰어넘기 <뛰어넘을 줄>"을 사용하세요'
            $계수기++
          } else {
            if (!Number($얼마나뛰어넘기)) {
              if (!$메모리버퍼[$얼마나뛰어넘기]) {
                document.getElementById('in-debugTextbox').value += '선언되지 않은 변수이름! (혹은 문법오류) ' + ($계수기 + 1) + '번째 줄, "뛰어넘기 <뛰어넘을 줄>"을 사용하세요'
              } else {
                if (!Number($메모리버퍼[$얼마나뛰어넘기])) {
                  document.getElementById('in-debugTextbox').value += '숫자가 아닌 변수! (혹은 문법오류) ' + ($계수기 + 1) + '번째줄, 숫자가 아닌 변수만큼 뛰어넘을수 없습니다'
                } else {
                  $계수기 += $메모리버퍼[$얼마나뛰어넘기] + 1
                }
              }
            } else {
              $계수기 += $얼마나뛰어넘기 + 1
            }
          }
        } else if ($한글한글[0] === '정하기' || $한글한글[0] === 'ㅅ') {
          let $변수이름 = $한글한글[1]
          let $변수값 = $한글한글.slice(2).join(' ')
          if (!$변수이름 || !$변수값) {
            document.getElementById('in-debugTextbox').value += '알수없는 문법! ' + ($계수기 + 1) + '번째 줄, "정하기 <변수이름> <변수 값>"을 사용하세요'
          } else {
            if ($변수이름.includes('$')) {
              document.getElementById('in-debugTextbox').value += '쓰기권한 없음! ' + ($계수기 + 1) + '번째 줄, "$"문자로 시작되는 변수이름은 값을 정할 수 없습니다'
            } else {
              $메모리버퍼[$변수이름] = $변수값
            }
            $계수기++
          }
        } else {
          document.getElementById('in-debugTextbox').value += '알수없는 문자! ' + ($계수기 + 1) + '번째 줄, ' + $한글한글[0]
          $계수기++
        }
      } else {
        if ($한글한글[1] === '에') {
          let $연산자 = $한글한글[3]
          let $연산되는자 = $한글한글[0]
          let $연산하는자 = Number($한글한글[2])
          if ($연산자 === '더하기') {
            $메모리버퍼[$연산되는자] = Number($메모리버퍼[$연산되는자]) + $연산하는자
            $계수기++
          } else if ($연산자 === '빼기') {
            $메모리버퍼[$연산되는자] = Number($메모리버퍼[$연산되는자]) - $연산하는자
            $계수기++
          } else if ($연산자 === '곱하기') {
            $메모리버퍼[$연산되는자] = Number($메모리버퍼[$연산되는자]) * $연산하는자
            $계수기++
          } else if ($연산자 === '나누기') {
            $메모리버퍼[$연산되는자] = Number($메모리버퍼[$연산되는자]) / $연산하는자
            $계수기++
          } else {
            document.getElementById('in-debugTextbox').value += '알수없는 연산자! ' + ($계수기 + 1) + '번째 줄, ' + $연산자 + ', 더하기/빼기/곱하기/나누기 를 사용하세요'
            $계수기++
          }
        }
      }
    }
  }
}
