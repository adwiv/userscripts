function printApplicantList() {
    let output = ``;
    let appIds = $("div.application_id").map((_, el) => el.innerText).toArray();

    for (let i = appIds.length - 1; i >= 0; i--) {
        let appId = appIds[i];
        let rating, fname, email, phone, degree, institute, userloc, skills, passing, years;
        rating = fname = email = phone = degree = institute = userloc = skills = passing = "";
        
        try {
            let container = $("#individual_application_" + appId);
            rating = container.find(".rating_text")[0].innerText

            fname = container.find(".applicant_name")[0].innerText;
            fname = fname.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

            // phone = container.find('#applicant_phone_number_'+appId)[0].value.substring(4)
            phone = container.find("#applicant_phone_number_" + appId).map((_, el) => el.value.substring(4)).toArray().join(", ");

            // degree = container.find('.education_details .title')[0].innerText
            degree = container.find(".education_details .title p").map((_, el) => el.innerText).toArray().join(", ");
            years = degree.match(/([0-9]+)/g);
            if (Array.isArray(years)) passing = years[years.length - 1];

            // institute = container.find('.education_details .institute')[0].innerText
            institute = container.find(".education_details .institute").map((_, el) => el.innerText).toArray().join(", ");

            // userloc = container.find('.applicant_locations')[0].innerText.split('\n')[0]
            userloc = container.find(".applicant_locations").map((_, el) => el.innerText.split("\n")[0]).toArray().join(", ");
            userloc = userloc.replace(' (Open to relocate)', '')

            skills = container.find(".skills_container .skills_text").map((_, el) => el.innerText).toArray().join(", ");

            output += `${appId}\t${rating}\t${fname}\t${email}\t${phone}\t${userloc}\t${degree}\t${passing}\t${institute}\t${skills}\n`;
        } catch (e) {
            console.error(`Error parsing id: ${appId} '${fname}'`);
        }
    }

    console.log(output);
}
