class CommodityChart {
    "use strict";

    useForBarchart() {
        try {
            // single bar chart
            var ctx = document.getElementById("singelBarChart");
            if (ctx) {
              ctx.height = 150;
        
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
                  labels: '<%= (resultValues.advertising_medium) %>'.split(', '),
                  datasets: [
                    {
                      label:  "Dataset",
                      data: '<%= (resultValues.magnitude) %>'.split(', '),
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
    }

}



<script>
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
    
    //==================================================================BAR SCROLL====================================================================
  })(jQuery);
    </script>