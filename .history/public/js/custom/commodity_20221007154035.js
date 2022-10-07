
(function ($) {
    // USE STRICT
    "use strict";
  //==================================================================LINE SCROLL====================================================================
    try {
      // single bar chart
      var ctx = document.getElementById("lineChart");
      if (ctx) {
        ctx.height = 150;
  
        const moveChart = {
          'id': 'lineChart',
          afterEvent(chart, args) {
            const { ctx, canvas, chartArea: { left, right, top, bottom, width, height } } = chart;
  
            canvas.addEventListener('mousemove', (e) => {
              const x = args.event.x;
              const y = args.event.y;
  
              if (x >= left - 15 && x <= left + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
                canvas.style.cursor = 'pointer';
              } else if (x >= right - 15 && x <= right + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
                canvas.style.cursor = 'pointer';
              }
              else {
                canvas.style.cursor = 'default';
              }
            })
          },
          afterDraw(chart, args, pluginOptions) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            class CircleArrow {
              draw(ctx, x1, pixel) {
                const angle = Math.PI / 180
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(102, 102,102, 0.5)';
                ctx.fillStyle = 'white';
                ctx.arc(x1, (height) / 2 + top, 15, angle * 0, angle * 360, false);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
  
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(225, 26,104, 0.9)';
                ctx.moveTo(x1 + pixel, height / 2 + top - 7.5)
                ctx.lineTo(x1 - pixel, height / 2 + top)
                ctx.lineTo(x1 + pixel, height / 2 + top + 7.5)
                ctx.stroke();
                ctx.closePath();
              }
            }
            let drawCircleLeft = new CircleArrow();
            drawCircleLeft.draw(ctx, left, 5);
  
            let drawCircleRight = new CircleArrow();
            drawCircleRight.draw(ctx, right, -5);
          }
        };
  
        var lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
            datasets: [
              {
                label: "My First dataset",
                data: [100, 55, 75, 81, 56, 55, 60, 40, 55, 75, 81, 56, 55, 40, 40, 55, 75, 81, 56, 55, 10],
                borderColor: "rgba(0, 123, 255, 0.9)",
                borderWidth: "0",
                backgroundColor: "rgba(0, 123, 255, 0.5)"
              },
              {
                label: "My Second dataset",
                borderColor: "rgba(225, 123, 255, 0.5)",
                borderWidth: "1",
                backgroundColor: "rgba(225, 123, 255, 0.5)",
                pointHighlightStroke: "rgba(225, 123, 255, 0.5)",
                data: [16, 32, 18, 26, 42, 33, 44, 22, 44, 67, 43, 76, 45, 12, 16, 32, 18, 26, 42, 33, 44,]
              }
            ]
          },
          options: {
            layout: {
              padding: {
                right: 16
              }
            },
            legend: {
              position: 'top',
              labels: {
                fontFamily: 'Poppins'
              }
            },
            scales: {
              x: {
                min: 0,
                max: 8,
              },
              y: {
                beginAtZero: true
              }
            }
          },
          plugins: [moveChart]
        });
  
        function moveScroll() {
          const { ctx, canvas, chartArea: { left, right, top, bottom, width, height } } = lineChart;
          canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= right - 15 && x <= right + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
              lineChart.options.scales.x.min = lineChart.options.scales.x.min + 9
              lineChart.options.scales.x.max = lineChart.options.scales.x.max + 9
              if (lineChart.options.scales.x.max >= lineChart.data.datasets[0].data.length) {
                lineChart.options.scales.x.min = lineChart.data.datasets[0].data.length - 9
                lineChart.options.scales.x.max = lineChart.data.datasets[0].data.length
              }
              lineChart.update();
            } else if (x >= left - 15 && x <= left + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
              lineChart.options.scales.x.min = lineChart.options.scales.x.min - 9
              lineChart.options.scales.x.max = lineChart.options.scales.x.max - 9
              if (lineChart.options.scales.x.min <= 0) {
                lineChart.options.scales.x.min = 0
                lineChart.options.scales.x.max = 8
              }
              lineChart.update();
            }
          })
        }
        lineChart.ctx.onClick = moveScroll()
      }
  
    } catch (error) {
      console.log(error);
    }
    //==================================================================LINE SCROLL====================================================================
  
    //==================================================================BAR SCROLL====================================================================
    try {
      // single bar chart
      var ctx = document.getElementById("singelBarChart");
      if (ctx) {
        ctx.height = 150;
        console.log('<');
  
        const moveChart = {
          'id': 'singelBarChart',
          afterEvent(chart, args) {
            const { ctx, canvas, chartArea: { left, right, top, bottom, width, height } } = chart;
  
            canvas.addEventListener('mousemove', (e) => {
              const x = args.event.x;
              const y = args.event.y;
  
              if (x >= left - 15 && x <= left + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
                canvas.style.cursor = 'pointer';
              } else if (x >= right - 15 && x <= right + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
                canvas.style.cursor = 'pointer';
              }
              else {
                canvas.style.cursor = 'default';
              }
            })
          },
          afterDraw(chart, args, pluginOptions) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
  
            class CircleArrow {
              draw(ctx, x1, pixel) {
                const angle = Math.PI / 180
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(102, 102,102, 0.5)';
                ctx.fillStyle = 'white';
                ctx.arc(x1, height / 2 + top, 15, angle * 0, angle * 360, false);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
  
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(225, 26,104, 0.9)';
                ctx.moveTo(x1 + pixel, height / 2 + top - 7.5)
                ctx.lineTo(x1 - pixel, height / 2 + top)
                ctx.lineTo(x1 + pixel, height / 2 + top + 7.5)
                ctx.stroke();
                ctx.closePath();
              }
            }
            let drawCircleLeft = new CircleArrow();
            drawCircleLeft.draw(ctx, left, 5);
  
            let drawCircleRight = new CircleArrow();
            drawCircleRight.draw(ctx, right, -5);
          }
        };
  
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
            datasets: [
              {
                label: "My First dataset",
                data: [100, 55, 75, 81, 56, 55, 60, 40, 55, 75, 81, 56, 55, 40, 40, 55, 75, 81, 56, 55, 10],
                borderColor: "rgba(0, 123, 255, 0.9)",
                borderWidth: "0",
                backgroundColor: "rgba(0, 123, 255, 0.5)"
              }
            ]
          },
          options: {
            layout: {
              padding: {
                right: 16
              }
            },
            legend: {
              position: 'top',
              labels: {
                fontFamily: 'Poppins'
              }
            },
            scales: {
              x: {
                min: 0,
                max: 8,
              },
              y: {
                beginAtZero: true
              }
            }
          },
          plugins: [moveChart]
        });
  
        function moveScroll() {
          const { ctx, canvas, chartArea: { left, right, top, bottom, width, height } } = myChart;
          canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= right - 15 && x <= right + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
              myChart.options.scales.x.min = myChart.options.scales.x.min + 9
              myChart.options.scales.x.max = myChart.options.scales.x.max + 9
              if (myChart.options.scales.x.max >= myChart.data.datasets[0].data.length) {
                myChart.options.scales.x.min = myChart.data.datasets[0].data.length - 9
                myChart.options.scales.x.max = myChart.data.datasets[0].data.length
              }
              myChart.update();
            } else if (x >= left - 15 && x <= left + 15 && y >= height / 2 + top - 15 && y <= height / 2 + top + 15) {
              myChart.options.scales.x.min = myChart.options.scales.x.min - 9
              myChart.options.scales.x.max = myChart.options.scales.x.max - 9
              if (myChart.options.scales.x.min <= 0) {
                myChart.options.scales.x.min = 0
                myChart.options.scales.x.max = 8
              }
              myChart.update();
            }
          })
        }
        myChart.ctx.onClick = moveScroll()
      }
  
    } catch (error) {
      console.log(error);
    }
    //==================================================================BAR SCROLL====================================================================
  })(jQuery);
  
  
  
  (function ($) {
    // USE STRICT
    "use strict";
    var navbars = ['header', 'aside'];
    var hrefSelector = 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])';
    var linkElement = navbars.map(element => element + ' ' + hrefSelector).join(', ');
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 900,
      outDuration: 900,
      linkElement: linkElement,
      loading: true,
      loadingParentElement: 'html',
      loadingClass: 'page-loader',
      loadingInner: '<div class="page-loader__spin"></div>',
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      browser: ['animation-duration', '-webkit-animation-duration'],
      overlay: false,
      overlayClass: 'animsition-overlay-slide',
      overlayParentElement: 'html',
      transition: function (url) {
        window.location.href = url;
      }
    });
  
  
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    // Map
    try {
  
      var vmap = $('#vmap');
      if (vmap[0]) {
        vmap.vectorMap({
          map: 'world_en',
          backgroundColor: null,
          color: '#ffffff',
          hoverOpacity: 0.7,
          selectedColor: '#1de9b6',
          enableZoom: true,
          showTooltip: true,
          values: sample_data,
          scaleColors: ['#1de9b6', '#03a9f5'],
          normalizeFunction: 'polynomial'
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  
    // Europe Map
    try {
  
      var vmap1 = $('#vmap1');
      if (vmap1[0]) {
        vmap1.vectorMap({
          map: 'europe_en',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          enableZoom: true,
          showTooltip: true
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  
    // USA Map
    try {
  
      var vmap2 = $('#vmap2');
  
      if (vmap2[0]) {
        vmap2.vectorMap({
          map: 'usa_en',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          enableZoom: true,
          showTooltip: true,
          selectedColor: null,
          hoverColor: null,
          colors: {
            mo: '#001BFF',
            fl: '#001BFF',
            or: '#001BFF'
          },
          onRegionClick: function (event, code, region) {
            event.preventDefault();
          }
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  
    // Germany Map
    try {
  
      var vmap3 = $('#vmap3');
      if (vmap3[0]) {
        vmap3.vectorMap({
          map: 'germany_en',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          onRegionClick: function (element, code, region) {
            var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
  
            alert(message);
          }
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  
    // France Map
    try {
  
      var vmap4 = $('#vmap4');
      if (vmap4[0]) {
        vmap4.vectorMap({
          map: 'france_fr',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          enableZoom: true,
          showTooltip: true
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  
    // Russia Map
    try {
      var vmap5 = $('#vmap5');
      if (vmap5[0]) {
        vmap5.vectorMap({
          map: 'russia_en',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          hoverOpacity: 0.7,
          selectedColor: '#999999',
          enableZoom: true,
          showTooltip: true,
          scaleColors: ['#C8EEFF', '#006491'],
          normalizeFunction: 'polynomial'
        });
      }
  
  
    } catch (error) {
      console.log(error);
    }
  
    // Brazil Map
    try {
  
      var vmap6 = $('#vmap6');
      if (vmap6[0]) {
        vmap6.vectorMap({
          map: 'brazil_br',
          color: '#007BFF',
          borderColor: '#fff',
          backgroundColor: '#fff',
          onRegionClick: function (element, code, region) {
            var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
            alert(message);
          }
        });
      }
  
    } catch (error) {
      console.log(error);
    }
  })(jQuery);
  (function ($) {
    // Use Strict
    "use strict";
    try {
      var progressbarSimple = $('.js-progressbar-simple');
      progressbarSimple.each(function () {
        var that = $(this);
        var executed = false;
        $(window).on('load', function () {
  
          that.waypoint(function () {
            if (!executed) {
              executed = true;
              /*progress bar*/
              that.progressbar({
                update: function (current_percentage, $this) {
                  $this.find('.js-value').html(current_percentage + '%');
                }
              });
            }
          }, {
            offset: 'bottom-in-view'
          });
  
        });
      });
    } catch (err) {
      console.log(err);
    }
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    // Scroll Bar
    try {
      var jscr1 = $('.js-scrollbar1');
      if (jscr1[0]) {
        const ps1 = new PerfectScrollbar('.js-scrollbar1');
      }
  
      var jscr2 = $('.js-scrollbar2');
      if (jscr2[0]) {
        const ps2 = new PerfectScrollbar('.js-scrollbar2');
  
      }
  
    } catch (error) {
      console.log(error);
    }
  
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    // Select 2
    try {
  
      $(".js-select2").each(function () {
        $(this).select2({
          minimumResultsForSearch: 20,
          dropdownParent: $(this).next('.dropDownSelect2')
        });
      });
  
    } catch (error) {
      console.log(error);
    }
  
  
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    // Dropdown 
    try {
      var menu = $('.js-item-menu');
      var sub_menu_is_showed = -1;
  
      for (var i = 0; i < menu.length; i++) {
        $(menu[i]).on('click', function (e) {
          e.preventDefault();
          $('.js-right-sidebar').removeClass("show-sidebar");
          if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
            $(this).toggleClass('show-dropdown');
            sub_menu_is_showed = -1;
          }
          else {
            for (var i = 0; i < menu.length; i++) {
              $(menu[i]).removeClass("show-dropdown");
            }
            $(this).toggleClass('show-dropdown');
            sub_menu_is_showed = jQuery.inArray(this, menu);
          }
        });
      }
      $(".js-item-menu, .js-dropdown").click(function (event) {
        event.stopPropagation();
      });
  
      $("body,html").on("click", function () {
        for (var i = 0; i < menu.length; i++) {
          menu[i].classList.remove("show-dropdown");
        }
        sub_menu_is_showed = -1;
      });
  
    } catch (error) {
      console.log(error);
    }
  
    var wW = $(window).width();
    // Right Sidebar
    var right_sidebar = $('.js-right-sidebar');
    var sidebar_btn = $('.js-sidebar-btn');
  
    sidebar_btn.on('click', function (e) {
      e.preventDefault();
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
      right_sidebar.toggleClass("show-sidebar");
    });
  
    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
      event.stopPropagation();
    });
  
    $("body,html").on("click", function () {
      right_sidebar.removeClass("show-sidebar");
  
    });
  
  
    // Sublist Sidebar
    try {
      var arrow = $('.js-arrow');
      arrow.each(function () {
        var that = $(this);
        that.on('click', function (e) {
          e.preventDefault();
          that.find(".arrow").toggleClass("up");
          that.toggleClass("open");
          that.parent().find('.js-sub-list').slideToggle("250");
        });
      });
  
    } catch (error) {
      console.log(error);
    }
  
  
    try {
      // Hamburger Menu
      $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.navbar-mobile').slideToggle('500');
      });
      $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
        var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
        $(this).toggleClass('active');
        $(dropdown).slideToggle('500');
        return false;
      });
    } catch (error) {
      console.log(error);
    }
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    // Load more
    try {
      var list_load = $('.js-list-load');
      if (list_load[0]) {
        list_load.each(function () {
          var that = $(this);
          that.find('.js-load-item').hide();
          var load_btn = that.find('.js-load-btn');
          load_btn.on('click', function (e) {
            $(this).text("Loading...").delay(1500).queue(function (next) {
              $(this).hide();
              that.find(".js-load-item").fadeToggle("slow", 'swing');
            });
            e.preventDefault();
          });
        })
  
      }
    } catch (error) {
      console.log(error);
    }
  
  })(jQuery);
  (function ($) {
    // USE STRICT
    "use strict";
  
    try {
  
      $('[data-toggle="tooltip"]').tooltip();
  
    } catch (error) {
      console.log(error);
    }
  
    // Chatbox
    try {
      var inbox_wrap = $('.js-inbox');
      var message = $('.au-message__item');
      message.each(function () {
        var that = $(this);
  
        that.on('click', function () {
          $(this).parent().parent().parent().toggleClass('show-chat-box');
        });
      });
  
  
    } catch (error) {
      console.log(error);
    }
  
  })(jQuery);