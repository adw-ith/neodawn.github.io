(function ($) {
    'use strict';

    $(document).on('ready', function () {
        // -----------------------------
        //  Screenshot Slider
        // -----------------------------
        $('.speaker-slider').slick({
            slidesToShow: 3,
            centerMode: true,
            infinite: true,
            autoplay: true,
            arrows:true,
            responsive: [
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
         });
        // -----------------------------
        //  Count Down JS
        // -----------------------------
        $('.timer').syotimer({
            year: 2017,
            month: 12,
            day: 9,
            hour: 20,
            minute: 30
        });
        // -----------------------------
        // To Top Init
        // -----------------------------
        $('.to-top').click(function() {
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
        });
        
        // -----------------------------
        // Magnific Popup
        // -----------------------------
        $('.image-popup').magnificPopup({
            type: 'image',
            removalDelay: 160, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true,
            fixedContentPos: false,
            fixedBgPos: true

        });
        // -----------------------------
        // Mixitup
        // -----------------------------
        var containerEl = document.querySelector('.gallery-wrapper');
        var mixer;
        if (containerEl) {
            mixer = mixitup(containerEl);
        }
    });

})(jQuery);

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
	// Add event listener to the form
	document.querySelector('#formsubmit-view').addEventListener('submit', send_mail);
});

function send_mail(event) {
    event.preventDefault(); // Prevent the default form submission

	// Get the values from the form
	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const phoneNo = document.querySelector('#phone').value;
	const message = document.querySelector('#message').value;
	const subject = document.querySelector('#subject').value;

	// Check if required fields are not empty
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Check if email is valid using a regular expression
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Check if phone number is valid (assuming a 10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

	// Send mail using formsubmit.co
	fetch("https://formsubmit.co/ajax/a04df2ccae5b848911f9d624d1a98820", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
			// 'Accept': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			email: email,
			phone: phoneNo,
			message: message,
			_subject: subject,
			_template: "table",
			_captcha: false
    	})
	})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

	// Hide the form and show the success message
	document.querySelector('#formsubmit-view').style.display = 'none';
	document.querySelector('#submitted-view').style.display = 'block';
}