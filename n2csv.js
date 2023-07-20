let printInReverse = true;

function parseApplicantList(count = 1000) {
  output = ``;
  tuples = $("div.tuple");

  if (printInReverse) {
    for (i = tuples.length - 1; i >= 0; i--) {
      output += parseApplicantTuple(tuples[i]);
    }
  } else {
    for (i = 0; i < tuples.length && i < count; i++) {
      output += parseApplicantTuple(tuples[i]);
    }
  }

  return output;
}

function parseApplicantTuple(container) {
  fname = $(".candidate-name", container)[0].innerText;
  fname = fname.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  overview = $(".candidate-overview", container);
  experience = $("span.ore-work ~ span.info-text", overview)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");
  curloc = $("span.ore-location_filled ~ span.info-text", overview)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");
  availability = $("span.ore-timer ~ span.info-text", overview)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");
  salary = $("span.ore-salary ~ span.info-text", overview)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");

  if (salary == "") salary = "-";
  if (curloc == "") curloc = "-";
  if (experience == "") experience = "-";
  if (availability == "") availability = "-";

  availability = availability.replace("Available to join in ", "");

  email = phone = "-";
  email = $(".showContactContainerEmail", container)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");
  phone = $(".showContactContainerPhone", container)
    .map(function () {
      return this.innerText;
    })
    .toArray()
    .join(", ");

  details = $(".candidate-details > .detail", container);
  current = prefloc = education = skills = "-";
  for (j = 0; j < details.length; j++) {
    title = $("label", details[j])[0].innerText.trim();
    info = $("span", details[j])[0]
      .innerText.trim()
      .replace(/(?:\r\n|\r|\n)/g, ",");
    if (title == "Current") current = info;
    if (title == "Key skills") skills = info;
    if (title == "Education") education = info;
    if (title == "Pref. Locations") prefloc = info;
  }

  line = `${fname}\t${email}\t${phone}\t${experience}\t${curloc}\t${availability}\t${salary}\t${current}\t${prefloc}\t${education}\t${skills}\n`;
  return line;
}

function printApplicantList() {
  // Scroll is necessary to load all data and avoid errors
  steps = 20;
  currentStep =
    (window.scrollY * steps) /
    (document.body.scrollHeight - window.innerHeight);
  if (currentStep > steps - 1) {
    output = parseApplicantList();
    console.log(output);
  } else {
    window.scrollTo({
      top: scrollY + document.body.scrollHeight / steps,
      behavior: "smooth",
    });
    setTimeout(printApplicantList, 1000);
  }
}
