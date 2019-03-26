// Reset form and focus the name imput
const myForm = document.querySelector('form');
myForm.reset();
$('#name').focus();
// Hide class other user if user picks Other from job dropdown list
$('.other').hide();

$('#title').on('change', function() {
	if ($(this).val() === 'other') {
		$('.other').show();		
	} else {
		$('.other').hide();
	}
});
// Show only the colors mathcing the design

$('<option>Please select a theme first</option>').insertBefore('#color :first');
$('#color').prop('selectedIndex',0);
$('#color').children(':gt(0)').hide();
$('#design').on('change', function() {
	if($('#design option:selected').val() === "js puns") {		
		$('#color').children(':lt(4)').show();
		$('#color').children(':first').hide();	
		$('#color').children(':gt(3)').hide();
		$('#color').prop('selectedIndex',1);
		
	} else if ($('#design option:selected').val() === "heart js") {		
		$('#color').children(':lt(4)').hide();
		$('#color').children(':gt(3)').show();
		$('#color').prop('selectedIndex',4);

	} else {
		 $('#color').children(':gt(0)').hide();
		//$('#color').prepend('<option>Please choose a theme<option>');
		$('#color').prop('selectedIndex',0);
	}	
});
var $totalPrice = 0;
var $priceHtml = "<h3></h3>";
$('.activities').append($priceHtml);
// hiding or showing the conflicting activities and calculating the total price
 $('.activities label').on("change",function(event) {
	const $myCheckboxes = $('.activities label');	
	const $currentIndex = $(this).index()-1;	
	const $valueRegex = /[^$]\d+$/g;
	const $value = parseInt(this.textContent.match($valueRegex)[0]);	
	switch ($currentIndex) {
		case 1:
		if (event.target.checked) {
			$myCheckboxes.eq(3).removeAttr('checked');
			$myCheckboxes.eq(3).css('color' , 'gray');
			$myCheckboxes.eq(3).children().attr('disabled',true);
			break;
		} else {
			$myCheckboxes.eq(3).children().removeAttr('disabled');
			$myCheckboxes.eq(3).css('color','black');
			break;
		}
		case 2:
		if (event.target.checked) {
			$myCheckboxes.eq(4).removeAttr('checked');
			$myCheckboxes.eq(4).css('color' , 'gray');
			$myCheckboxes.eq(4).children().attr('disabled',true);
			break;
		} else {
			$myCheckboxes.eq(4).children().removeAttr('disabled');
			$myCheckboxes.eq(4).css('color','black');
			break;
		}
		case 3:
		if (event.target.checked) {
			$myCheckboxes.eq(1).removeAttr('checked');
			$myCheckboxes.eq(1).css('color' , 'gray');
			$myCheckboxes.eq(1).children().attr('disabled',true);
			break;
		} else {
			$myCheckboxes.eq(1).children().removeAttr('disabled');
			$myCheckboxes.eq(1).css('color','black');
			break;
		}
		case 4:
		if (event.target.checked) {
			$myCheckboxes.eq(2).removeAttr('checked');
			$myCheckboxes.eq(2).css('color' , 'gray');
			$myCheckboxes.eq(2).children().attr('disabled',true);
			break;
		} else {
			$myCheckboxes.eq(2).children().removeAttr('disabled');
			$myCheckboxes.eq(2).css('color','black');
			break;
		}	
		default:
			break;
	}

	(event.target.checked) ? 	$totalPrice += $value : $totalPrice -= $value;
	$('.activities h3').text("Total: $"+$totalPrice);
	($totalPrice === 0) ? $('.activities h3').hide() : $('.activities h3').show();	
}); 
// setting the credit card option to defaul payment method
$('#payment option[value="credit card"]').attr("selected",true);
$('#payment option[value="select_method"]').attr("disabled",true);
$('fieldset:last div').slice(4).hide();
// showing or hiding bitcoin or paypal divs
$('#payment').on('change', function(event){
	const $payOption = $('#payment :selected').val();
	switch ($payOption){
		case 'paypal':
		$('fieldset:last div').hide();
		$('fieldset:last div').eq(4).show();
		break;		
		case 'bitcoin':
		$('fieldset:last div').hide();
		$('fieldset:last div').eq(5).show();
		break;
		case 'credit card':
		$('fieldset:last div').hide();
		$('div#credit-card').show();
		$('div#credit-card').children().show();
		break;	
	} 
})

/*function isValidname(name) {		
	$('#name').addClass('error');
	return /^[a-zA-Z]+$/.test(name);	
}

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

*/
function formatName(name) {
	return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});	
};
// validate form
$('form button[type="submit"]').on("click", function(e){
	const name = $('#name').val();
	const nameRegex = /^[A-Za-z]+$/.test(name);
	const email = $('#mail').val();
	const emailRegex =/^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
	const isChecked = $('.activities input').is(':checked');
	const cardNumber = $('#cc-num').val();
	const ccRegex = /^\d{13,16}$/.test(cardNumber);
	const zipCode = $("#zip").val();
	const validateZip = /^\d{5}$/.test(zipCode);
	const cvvCode = $("#cvv").val();
	const validateCvv = /^\d{3}$/.test(cvvCode);
	const errorParagraph = "<p>Please select one activity</p>";
	
	if(!nameRegex) {
		e.preventDefault();
		$('#name').focus();
		$('#name').addClass('error');
		$('#name').attr('placeholder','Please enter your name');		
	} else {
		$('#name').removeClass('error');
	}
	if(!emailRegex) {
		e.preventDefault();
		$('#mail').focus();
		$('#mail').addClass('error');
		$('#mail').attr('placeholder','This field is required');		
	} else {
		$('#mail').removeClass('error');
	}
	if(!isChecked) {
		e.preventDefault();
		$('.activities').focus();
		$('.activities').addClass("error");
		$('.activities').prepend(errorParagraph);
	} else {
		$('.activities').removeClass('error');
	}
	if(!ccRegex){
		e.preventDefault();
		$('#cc-num').focus();
		$('#cc-num').addClass('error');		
	} else {
		$('#cc-num').removeClass('error');
	}
	if(!validateZip){
		e.preventDefault();
		$('#zip').focus();
		$('#zip').addClass('error');
	} else {
		$('#zip').removeClass('error');
	}
	if(!validateCvv){
		e.preventDefault();
		$('#cvv').focus();
		$('#cvv').addClass('error');
	} else {
		$('#cvv').removeClass('error');
	}
});