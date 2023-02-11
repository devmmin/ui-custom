// const wrapper = document.querySelector('.wrapper');
// const items = document.querySelectorAll('.item');

// FIXME: 2번째 버전 - 이벤트리스너 등록은 가급적 최소화하는게 바람직, 그래서 수정된 버전
// FIXME: 이벤트 버블링이 일어나서 실제로 클릭된건 item인데, wrapper에 click 이벤트가 등록되어 이벤트 리스너가 실행됨
// wrapper.addEventListener('click', function (e) {
//   const targetElem = e.target;
//   // FIXME: item 또는 wrapper 에서 발생한 클릭 이벤트가 body 까지 버블링되는 것(body의 이벤트리스너가 실행됨)을 막기위함
//   e.stopPropagation();
//   if (!targetElem.classList.contains('item')) return;
//   targetElem.classList.toggle('open');
//   items.forEach(function (elem) {
//     if (elem !== targetElem) elem.classList.remove('open');
//   });
// });

// FIXME: 처음 버전 - 범위를 줄이고 해당 아이템마다 이벤트리스너를 건다
// const items = document.querySelectorAll('.item');
// items.forEach(function (item) {
//   item.addEventListener('click', function (e) {
//     item.classList.toggle('open');
//     items.forEach(function (elem) {
//       if (elem !== item) elem.classList.remove('open');
//     });
//   });
// });

// FIXME: 3번째 버전 - 리스너가 더 줄어든 버전
// FIXME: 단점은 조건문이 많아져서 로직 최적화가 필요함
// FIXME: 이벤트리스너가 한개의 타겟에 전부 걸려있어서 분리불가 (일부 이벤트리스너 (제거하여 메모리관리) 또는 로직만 관리)
// document.body.addEventListener('click', function (e) {
//   if (e.target.classList.contains('context')) return;
//   // FIXME: item 클릭했을경우
//   if (e.target.classList.contains('item')) {
//     e.target.classList.toggle('open');
//     items.forEach(function (elem) {
//       if (elem !== e.target) elem.classList.remove('open');
//     });
//     return;
//   }
//   // FIXME: item 제외하고 클릭했을경우
//   items.forEach(function (elem) {
//     elem.classList.remove('open');
//   });
// });

// FIXME: html details 태그의 기본 동작을 활용해서 동작에 대한 고민이 필요없어짐 (효율적)
// FIXME: html의 기본적으로 제공하는 동작이 js로 직접 작성한것보다 성능적이나 동작에 대한 신뢰
// FIXME: css로 추가적으로 컨트롤 하지 않는 이상 기본적인 동작을 보기 쉽다
const items = document.querySelectorAll('details');

document.body.addEventListener('click', function (e) {
  // FIXME: 클릭한 item 이 컨텍스트메뉴와 클릭했을 때 열려야하는 영역이 아닌경우 전부 open 제거 (닫음)
  if (e.target.nodeName !== 'SUMMARY' && e.target.nodeName !== 'P') {
    items.forEach(function (item) {
      item.removeAttribute('open');
    });
  }
  // FIXME: 클릭한 item 이외에는 전부 open 제거 (닫음)
  items.forEach(function (item) {
    if (item !== e.target.parentElement) {
      item.removeAttribute('open');
    }
  });
});
