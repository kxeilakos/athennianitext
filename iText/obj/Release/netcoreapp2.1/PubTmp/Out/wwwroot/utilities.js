//Constants

// Local: "https://localhost:44396/"   & 
// Azure: "https://athennianitextpdftool.azurewebsites.net/"

var baseUrl = "https://localhost:44396/";

var targetModes = {
	Blank: "_blank",
	Parent: "_parent"
};

$(document).ready(function () {

	// EVENTS
	var createHWBtn = $('#createHWBtn');
	createHWBtn.click(function () {
		var fileName = $('#fileName').val();
		var fileText = $('#fileText').val();

		if (!fileName.length > 0) {
			setCreateResponseMessage("File Name is Required");
			return;
		}
		showSpinner0();
		setCreateResponseMessage("");

		var url = "/api/itext/CreateFile";
		var request = {
			filename: fileName,
			filetext: fileText
		};
		CallWS("POST", url, "json", request, "application/json;charset=utf-8", createFileSuccessClb);
	});


	var concatenateWithContnetsBtn = $('#concatenateWithContnetsBtn');
	concatenateWithContnetsBtn.click(function () {
		setConcatResponseMessage("");
		showSpinner2();
		var fileName = $('#fileNameWithContentsConc').val();
		hideActiveSpinners 
		var url = "/api/itext/ConcatenateWithContents";
		var request = {
			filename: fileName
		};
		CallWS("POST", url, "json", request, "application/json;charset=utf-8", concatFileSuccessClb);
	});

	var createNBBtn = $('#createNBBtn');
	createNBBtn.click(function () {

		var fileName = $('#fileNameNB').val();
		if (!fileName.length > 0) {
			setCreateResponseMessage("File Name is Required");
			return;
		}
		setCreateNBResponseMessage("");
		showSpinner3();
		var url = "/api/values/CreateFileWithNB";
		var request = {
			filename: fileName
		};
		CallWS("POST", url, "json", request, "application/json;charset=utf-8", createFileNBSuccessClb);
	});

	var createBKBtn = $('#createBKBtn');
	createBKBtn.click(function () {

		var fileName = $('#fileNameBK').val();
		if (!fileName.length > 0) {
			setCreateResponseMessage("File Name is Required");
			return;
		}
		setCreateBKResponseMessage("");
		showSpinner4();
		var url = "/api/values/CreateFileWithBK";
		var request = {
			filename: fileName
		};
		CallWS("POST", url, "json", request, "application/json;charset=utf-8", createFileBKSuccessClb);
	});

	// CALLBACKS

	// SUCCESS CLB
	function createFileSuccessClb(response) {
		hideiTextSpinners();

		setCreateResponseMessage(response.message);

		if (response.success) {
			var url = baseUrl + response.fileName;
			window.open(url, targetModes.Blank);
		}
	}

	function concatFileSuccessClb(response) {
		hideiTextSpinners();
		setConcatResponseMessage(response.message);

		if (response.success) {
			var url = baseUrl + response.fileName;
			window.open(url, targetModes.Blank);
		}
	}

	function uploadFileSuccessClb(response) {
		hideiTextSpinners();
		setUploadResponseMessage(response.message);
	}

	function createFileNBSuccessClb(response) {
		hideiTextSpinners();
		setCreateNBResponseMessage(response.message);
		if (response.success) {
			var url = baseUrl + "File_With_NB.pdf";
			window.open(url, targetModes.Blank);
		}
	}
	function createFileBKSuccessClb(response) {
		hideiTextSpinners();
		setCreateBKResponseMessage(response.message);
		if (response.success) {
			var url = baseUrl + "File_With_BK.pdf";
			window.open(url, targetModes.Blank);
		}
	}

	// CALLWS
	function CallWS(type, url, dataType, request, contentType, callback) {

		$.ajax({
			type: type,
			contentType: contentType,
			url: url,
			dataType: dataType,
			data: JSON.stringify(request),
			success: function (data) {
				hideiTextSpinners();
				if (callback) callback(data);
			},
			failure: function (data) {
				hideiTextSpinners();
				alert("Error!");
			},
			error: function (data) {
				hideiTextSpinners();
				alert("Error");
			}
		});
	}

	// HELPERS

});











// SHOW / HIDE ELEMENTS
function showSpinner0() {
	$('#ath-spinner-0').show();
}
function hideSpinner0() {
	$('#ath-spinner-0').hide();
}
function showSpinner1() {
	$('#ath-spinner-1').show();
}
function hideSpinner1() {
	$('#ath-spinner-1').hide();
}
function showSpinner2() {
	$('#ath-spinner-2').show();
}
function hideSpinner2() {
	$('#ath-spinner-2').hide();
}
function showSpinner3() {
	$('#ath-spinner-3').show();
}
function hideSpinner3() {
	$('#ath-spinner-3').hide();
}
function showSpinner4() {
	$('#ath-spinner-4').show();
}
function hideSpinner4() {
	$('#ath-spinner-4').hide();
}


function hideiTextSpinners() {
	hideSpinner0();
	hideSpinner1();
	hideSpinner2();
	hideSpinner3();
	hideSpinner4();
}

// SET Messages
function setCreateResponseMessage(message) {
	$('#createResponseMsg').text(message);
}
function setUploadResponseMessage(message) {
	$('#uploadResponseMsg').text(message);
}
function setConcatResponseMessage(message) {
	$('#concatenateResponseMsg').text(message);
}
function setCreateNBResponseMessage(message) {
	$('#createNBResponseMsg').text(message);
}
function GetFileName() {
	return $('#inputFileTxt')[0].files[0];
}
function setCreateBKResponseMessage(message) {
	$('#createBKResponseMsg').text(message);
}
