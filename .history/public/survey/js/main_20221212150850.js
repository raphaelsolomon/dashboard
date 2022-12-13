(function($) {



    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            email: {
                email: true
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            current: ''
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            }
            if (currentIndex === 1) {
                form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 2) {
                form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 3) {
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
            }
            // if(currentIndex === 4) {
            //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
         
            var first_name = $("$first_name").val();
            

           var emp_status = $('#emp_status').find(":selected").val();
           var emp_qualification = $('#emp_qualification').find(":selected").val();

           var course_study = $('#course_study').find(":selected").val();
           var osh_qualifications = $('#osh_qualifications').find(":selected").val();

           var years_of_experiences = $('#years_of_experiences').find(":selected").val();
           var osh_field_of_expertise = $('#osh_field_of_expertise').find(":selected").val();


            //form[0].submit();
        },
        onStepChanged: function(event, currentIndex, priorIndex) {
            return true;
        }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: '',
        monthDefault: '',
        yearDefault: '',
        minimumAge: 0,
        maximumAge: 120
    });
    var marginSlider = document.getElementById('slider-margin');
    if (marginSlider != undefined) {
        noUiSlider.create(marginSlider, {
              start: [1100],
              step: 100,
              connect: [true, false],
              tooltips: [true],
              range: {
                  'min': 100,
                  'max': 2000
              },
              pips: {
                    mode: 'values',
                    values: [100, 2000],
                    density: 4
                    },
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    prefix: '$ ',
                })
        });
        var marginMin = document.getElementById('value-lower'),
	    marginMax = document.getElementById('value-upper');

        marginSlider.noUiSlider.on('update', function ( values, handle ) {
            if ( handle ) {
                marginMax.innerHTML = values[handle];
            } else {
                marginMin.innerHTML = values[handle];
            }
        });
    }
})(jQuery);


// ======================== OTHER SELECTION ===================

function em_other(value) {
    if (value === 4) {
        document.getElementById("em_status").style.display = 'block';
    }else{
        document.getElementById("em_status").style.display = 'none';
    }
}

function ed_other(value) {
    if (value === 6) {
        document.getElementById("ed_level").style.display = 'block';
    }else{
        document.getElementById("ed_level").style.display = 'none';
    }
}
function fd_other(value) {
    if (value === 21) {
        document.getElementById("fd_expertise").style.display = 'block';
    }else{
        document.getElementById("fd_expertise").style.display = 'none';
    }
}
function cs_other(value) {
    if (value === 615) {
        document.getElementById("course_study").style.display = 'block';
    }else{
        document.getElementById("course_study").style.display = 'none';
    }
}


