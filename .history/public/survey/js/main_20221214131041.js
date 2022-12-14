(function ($) {
    $("#alert_dialog").hide();
    $("#alert_dialog_failed").hide();


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
        onfocusout: function (element) {
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
        onStepChanging: function (event, currentIndex, newIndex) {
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
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {

            var first_name = $("#first_name").val();
            var last_name = $("#last_name").val();
            var email = $("#email").val();
            var countrys = $("#countrys").val();
            var phone = $("#phone").val();
            var date_of_birth = $("#date_of_birth").val();

            var gender = $('#gender').find(":selected").val();

            var emp_status = $('#emp_status').find(":selected").val() === '' ? $("#em_status_other").val() : $('#emp_status').find(":selected").val();
            var emp_qualification = $('#emp_qualification').find(":selected").val() === '' ? $("#ed_level_other").val() :  $('#emp_qualification').find(":selected").val();

            var course_study = $('#course_studied').find(":selected").val() === "other" ?  :  $('#course_studied').find(":selected").val();
            var osh_qualifications = $('#osh_qualifications').find(":selected").val();

            var years_of_experiences = $('#years_of_experiences').find(":selected").val();
            var osh_field_of_expertise = $('#osh_field_of_expertise').find(":selected").val();

            var other_competent_field = $('#other_competent_field').val();
            var core_skill = $("#core_skill").val();

            var formData = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                country: countrys,
                phone: phone,
                date_of_birth: date_of_birth,
                gender: gender,
                emp_status: emp_status,
                emp_qualification: emp_qualification,
                course_study: course_study,
                osh_qualifications: osh_qualifications,
                years_of_experiences: years_of_experiences,
                osh_field_of_expertise: osh_field_of_expertise,
                other_competent_field: other_competent_field,
                core_skill: core_skill
            }
            $.ajax({
                type: "POST",
                url: "/OSHsurvey/submit",
                data: formData,
                dataType: "json",
                encode: true,
            }).done(function (data) {
                if (data.err === false) {
                    $("#alert_dialog").show();
                    $('#signup-form').trigger("reset");
                    $(window).scrollTop(0);
                } else {
                    $("#alert_dialog_failed").show();
                    $('#signup-form').trigger("reset");
                    $(window).scrollTop(0);
                }
            });
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
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

        marginSlider.noUiSlider.on('update', function (values, handle) {
            if (handle) {
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
        $("#em_status_other").css("display", "block")
    } else {
        $("#em_status_other").css("display", "none")
    }
}

function ed_other(value) {
    if (value === 6) {
       $("#ed_level_other").css("display", "block")
    } else {
        $("#ed_level_other").css("display", "none")
    }
}
function fd_other(value) {
    if (value === 21) {
        $("#fd_expertise_other").css("display", "block")
    } else {
        $("#fd_expertise_other").css("display", "none")
    }
}
function cs_other(value) {
    if (value === 615) {
        $("#course_study_other").css("display", "block")
    } else {
        $("#course_study_other").css("display", "none")
    }
}


