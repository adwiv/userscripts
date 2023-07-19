function printApplicantList() {
  output = ``;
  appIds = $("div.application_id")
    .map(function () {
      return this.innerText;
    })
    .toArray();
  for (i = appIds.length - 1; i >= 0; i--) {
    appId = appIds[i];
    container = $("#individual_application_" + appId);
    fname = phone = degree = institute = userloc = skills = passing = "";

    fname = container.find(".applicant_name")[0].innerText;
    fname = fname.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // phone = container.find('#applicant_phone_number_'+appId)[0].value.substring(4)
    phone = container
      .find("#applicant_phone_number_" + appId)
      .map(function () {
        return this.value.substring(4);
      })
      .toArray()
      .join(", ");

    // degree = container.find('.education_details .title')[0].innerText
    degree = container
      .find(".education_details .title p")
      .map(function () {
        return this.innerText;
      })
      .toArray()
      .join(", ");
    years = degree.match(/([0-9]+)/g);

    if (Array.isArray(years)) passing = years[years.length - 1];

    // institute = container.find('.education_details .institute')[0].innerText
    institute = container
      .find(".education_details .institute")
      .map(function () {
        return this.innerText;
      })
      .toArray()
      .join(", ");

    // userloc = container.find('.applicant_locations')[0].innerText.split('\n')[0]
    userloc = container
      .find(".applicant_locations")
      .map(function () {
        return this.innerText.split("\n")[0];
      })
      .toArray()
      .join(", ");

    skills = container
      .find(".skills_container .skills_text")
      .map(function () {
        return this.innerText;
      })
      .toArray()
      .join(", ");

    output += `${appId}\t${fname}\t${phone}\t${userloc}\t${degree}\t${passing}\t${institute}\t${skills}\n`;
  }
  console.log(output);
}
