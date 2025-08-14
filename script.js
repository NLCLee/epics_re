$(document).ready(function () {
	//타이틀 클릭
	$(".title-line").on("click", function () {
		const $clicked = $(this);
		const id = $clicked.attr("id"); // 예: "title-epics"
		const key = id.split("title-")[1]; // "epics"

		if ($(this).is(".main-title")) {
			$(".main-title").css("pointer-events", "none");
			$(".main-title .text-outline").addClass("text-collapse");
			$(".main-title .text-initial").addClass("initial-move");
			setTimeout(() => {
				$(".container").addClass("fade-out");
			}, 1500);
			setTimeout(() => {
				$(".container").css("display", "none");
				// id에서 'title-' 뒤의 문자열 추출

				$(".content-page").removeClass("page-show");
				$("#page-" + key).addClass("page-show");
			}, 2100);

			setTimeout(() => {
				$(".content-page").removeClass("page-show");
				$("#page-" + key).addClass("page-show");
			}, 2600);
		} else {
			$(".content-page").removeClass("page-show");
			$("#page-" + key).addClass("page-show");
		}
	});

	$("#page-insight, #page-contact, #page-service").on(
		"click",
		".title-line",
		function () {
			const url = $(this).data("url"); // data-url 읽기
			if (url) {
				window.open(url, "_blank"); // 해당 url로 이동
			}
		}
	);

	function getScrollbarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}

	$(".home-btn, .img-card").on("click", function () {
		const url = $(this).data("url");
		if (url) {
			window.open(url, "_blank");
			return;
		}
		let imgSrc = $(this).find(".detail-img").data("src");
		$(".card-viewer").html('<img src="' + imgSrc + '" alt="">');
		$(".card-viewer").animate({ scrollTop: 0 });
		$(".content-page").css({
			overflow: "hidden",
			"padding-right": "15px",
		});
		$(".viewer-bg").fadeIn(300);
	});

	// 뷰어 영역 클릭 시 닫기
	$(".viewer-bg").on("click", function () {
		// 이미지 클릭이 아니라 바탕 클릭일 때만 닫기
		$(".viewer-bg").fadeOut(300);
		$(".content-page").css({
			overflow: "auto",
			"padding-right": "",
		});
	});

	//뒤로가기
	$(".back-btn").on("click", function () {
		const $currentPage = $(this).closest(".content-page");
		const upperPageKey = $currentPage.data("upper"); // data-upper 값 읽기

		// 현재 페이지 숨기기
		$currentPage.removeClass("page-show");

		// 상위 페이지 보여주기
		if (upperPageKey == "home") {
			$(".container").removeClass("fade-out");
			$(".container").css("display", "flex");
			$(".main-title .text-outline").removeClass("text-collapse");
			$(".main-title .text-initial").removeClass("initial-move");
			$(".main-title").css("pointer-events", "all");
			$(".container").addClass("reset-in");
		} else {
			$("#page-" + upperPageKey).addClass("page-show");
		}
	});

	$(".fixed-movetop").on("click", function () {
		$("html, body").animate({ scrollTop: 0 }, 500);
	});

	// Reset 버튼
	$(".reset-btn").on("click", function () {
		$(".reset-overlay").addClass("reset-in");
		setTimeout(() => {
			location.reload(); // 간단한 초기화 방식
		}, 1000);
	});

	document.addEventListener("animationend", function () {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("content-view");
					} else {
						entry.target.classList.remove("content-view");
					}
				});
			},
			{
				threshold: 0.2, // 10% 보이면 감지
			}
		);

		document.querySelectorAll(".contents").forEach((el) => {
			observer.observe(el);
		});
	});

	const swiper = new Swiper(".mySwiper", {
		effect: "fade", // 페이드 효과
		loop: true, // 무한 반복
		speed: 1000, // 전환 속도
		autoplay: {
			// 자동 재생
			delay: 5000,
			disableOnInteraction: false,
		},
		fadeEffect: {
			// 페이드 전환 옵션
			crossFade: true, // 슬라이드 겹치면서 전환
		},
		slidesPerView: 1, // 한 번에 1장
		spaceBetween: 0,
		breakpoints: {
			// 반응형
			480: { slidesPerView: 1 },
			768: { slidesPerView: 1 },
			1024: { slidesPerView: 1 },
		},
	});
});
