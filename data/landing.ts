import moment from 'moment-timezone';
const contact_email = 'louise@peacefactory.fr';
const contact_name = 'Louise';
const facebook_event_url = 'https://www.facebook.com/events/3210099345744991/';
const irmtraud_email = 'irmtraudkauschat@gmail.com';
const post_payment_questionaire =
  'https://peacefactory.typeform.com/to/aIIB8QBn';
const buy_ticket_url =
  'https://www.eventbrite.co.uk/e/nonviolent-communication-virtual-intensive-course-2020-tickets-112284722628';
const startDate = moment('2020-11-13T08:30:00Z'); // in UTC
const endDate = moment('2020-11-22T16:30:00Z'); // in UTC
const timeZone = moment.tz.guess();
const timeZoneOffset = new Date().getTimezoneOffset();
const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);

export default {
  payment_thank_you: `
  We are delighted to see that you registered using this email address **{{email_id}}**.

  If the email is not correct or you decide to use a different one to access the course platform, we invite you to send an email from the address you would like to use to <a href="mailto:${contact_email}?subject=VIC Email ID Correction">${contact_email}</a>.

  We asked for minimal information when booking so that you choose the best moment to fill in more details. Before the start of the course and when you have about 10 minutes free, we invite you to fill in the questionaire.

  <a href="${post_payment_questionaire}" target="_blank" class="btn btn-primary rounded-pill">Help us organise better</a> <a href="/" class="btn btn-link">Return to course info</a>

  We will send you an email a few days before the course begins so that you can prepare well. If you have any questions, feel free to contact us. Thank you and see you soon!`,
  cover_image: '/images/cover.jpg',
  mission_title:
    '<span>Nonviolent Communication</span> <span>Virtual Intensive Course</span>',
  mission_description:
    '<span>Learn Nonviolent Communication skills</span> <span>from the safety and comfort of your own home.</span>',
  dates: `Starts at ${startDate
    .tz(tzName)
    .format('h:mm a z dddd, MMMM Do YYYY')}
  until ${endDate.tz(tzName).format('h:mm a z dddd, MMMM Do YYYY')}`,
  buy_ticket_url,
  video_embed_url: '',
  facebook_event_url,
  contact_email,
  trainers_intro: 'Meet our CNVC certified trainers',
  before_about: ``,
  about: `
  We are delighted to invite you to co-create with us a safe container where people from dozens of countries tap into the living energy of an emerging community using Nonviolent Communication. Participating, practising and experimenting with the support of world-known experienced certified trainers, you learn skills which are quickly transferred, making profound changes to everyday life and to take a stand for a world where everyone’s needs matter.

  This Virtual Intensive Course is equivalent to an International Intensive Training, endorsed and fully supported by the Center for Nonviolent Communication. Join us from the 13th to 22nd November 2020 (with two days off - Monday 16th and Thursday 19th).

  You can ask for what you want to learn and the trainers respond to your requests.  Some of the possible topics are: conflict resolution, anger, personal growth, social change, relationships, spirituality, parenting, education, workplace, and a special beginner track - many sessions to choose from and videos to watch later!

  **Equipment required**: a webcam, microphone and an internet connection.

  **Language**: English (translation may be available for some other languages, depending on who registers).
  `,
  course: `Through a range of activities, the VIC aims to expand the reach and scope of technology-enabled people-to-people courses sustained over a period of 8 days. With a ratio of about twelve people per trainer, the programme structure is intensive, with some participants who have NVC skills and awareness well beyond the early levels, whilst others are starting their NVC journey.

The course is designed to promote the integration and sustainability of work throughout the following year and in addition to the eight-day course in November, there is an option for small groups to stay in active contact once a fortnight and to enjoy monthly mentoring from one of the trainers.

<div class="py-4 h3 text-center" id="dates-times">
  Dates and times
</div>

Starts on  November 13th (Friday) and ends on November 22nd (Sunday) with two days of rest in between, one on Monday November 16th (Monday) and the other on November 19th (Thursday). Full of NVC activities, each day has individual choices for your level of engagement according to your own learning needs. There are two community sessions (1 & 5) lasting a total of up to 2 hours that we would encourage everybody to attend in order to support our focus on community building. All other sessions are highly recommended but  optional.  In our experience, a way to support the group's needs looks like this [schedule](https://docs.google.com/spreadsheets/d/1az-Z-dDhEgckF5GVmbAKwxNLpoA5vx_XmR2Jg-vFUsY/edit?usp=sharing).

<div class="py-4 h3 text-center" id="what-to-expect">
  What to expect?
</div>

- **Richness and diversity**: Every year there are participants from many countries and this tremendous inter-cultural diversity adds to the richness of experience and exploration.
- **Depth and breadth**: Throughout the course, along numerous training sessions and community meetings, we explore together a needs-based consciousness in all facets of life – in relationship to self, others and life, at home and at work, in relationship to inner as well as outer resources. We want to fully explore what life is and what it can be, from the very practical realms to the deeply spiritual ones. No theme is off-topic and everything is embraced.
- **Community**: We aim to live equality in our community, exploring and creating together. We are aware of different talents and passions we bring into the course and this diversity proves to be a contributing element.

<div class="py-4 h3 text-center" id="language">
  Language
</div>

**English** is used as our shared common language during community sessions. No translation is envisaged by the organisers, although our experience is that many bilingual people are happy to jump in when necessary on an ad hoc basis. You can also buy a ticket for two and work side by side with your own interpreter.

If you would like to be informed of other people who speak your language, do check back from time-to-time to see what interpretation is being offered.

<div class="py-4 h3 text-center" id="what-you-need">
  What you need
</div>

All the meetings will take place on [Zoom](https://zoom.us) which is compatible with Microsoft or Apple. After registering, if you’re new to Zoom, you can access detailed information about how to use it and be supported with technical aspects. Peace Factory has 9 years of experience offering online courses, so you’re in good hands.

<div class="py-4 h3 text-center" id="fee">
  Participation fee
</div>

_Prices are in Euros._
_If you would prefer to pay in US Dollars, please contact <a href="mailto:${contact_email}">${contact_name}</a>._

The fee to participate for the eight days online course includes access to the Virtual Exchange Platform and full course documentation. It does not include equipment to join or your internet connection.

<table class="table">
  <tbody>
    <tr>
      <th scope="row">€1500</th>
      <td>Standard contribution per person</td>
    </tr>
    <tr>
      <th scope="row">€2800</th>
      <td>Two people sharing the same postal address booked at the same time with one receipt and two certificates of attendance</td>
    </tr>
    <tr>
      <th scope="row">€500</th>
      <td>Participating CNVC certified trainer</td>
    </tr>
    <tr>
      <th scope="row">€1125</th>
      <td>Registered certification candidate with CNVC</td>
    </tr>
    <tr>
      <th scope="row">&nbsp;</th>
      <td>Reduced-resources contribution (please fill out <a href="https://peacefactory.typeform.com/to/JDtABYdF">this form</a>)</td>
    </tr>
  </tbody>
</table>
  `,
  faqs: [
    {
      question: 'Why are you organising this Virtual Intensive Course?',
      answer:
        'Our team believes that Nonviolent Communication is one of the most powerful tools to bring the social change to contribute to peace in the world. We know that there is a different way of being which brings more joy and satisfaction for everyone, including children, parents, managers, couples. This is why we created a platform which allows people from all over the world to learn about NVC in the safety and comfort of their own homes.',
    },
    {
      question: 'What is Nonviolent Communication?',
      answer: `NVC was developed by Marshall Rosenberg, an American psychologist, who was the Educational Director of CNVC, the world-wide organisation that brings NVC together on a global basis.

Nonviolent communication (NVC) is an approach and a way of living that aims to bring any human being closer to themselves and to those around them. Above all, it serves as a compass for creating a life that is aligned with our deepest values, moment to moment.

Through a set of tools for listening to our needs, NVC gives us an opportunity to have effective communication with people around us, and helps us solve conflict in a compassionate and connecting way. In addition, NVC can be used for designing life-supporting communities and systems, in government, business, schools, and more.`,
    },
    {
      question: 'I know nothing about Nonviolent Communication. Can I come?',
      answer: `You’re so welcome! No experience is required to join and we have a special beginners track for 2 days designed just for you!`,
    },
    /* {
      question: 'Why limit the number of people for the course?',
      answer: `This is not designed as a festival or gathering, it’s a course for skill building, and so the number of people is limited to assure the learning aspects.`,
    }, */
    {
      question: 'What is an EIC and a VIC?',
      answer: `
  - Normally, the EIC (European Intensive Course) is an 8-day event  organised every year by Peace Factory in France, Europe. The VIC is a virtual format of the same course.
  - An experiential workshop for developing fluency in Nonviolent Communication
  - An opportunity to learn and practice Nonviolent Communication with Peace Factory certified trainers
  - A safe environment for personal growth
  - A time to make deep connections
  - A group of people from different cultures working together toward transformed relationships and social systems
      `,
    },
    {
      question: 'What will it be like?',
      answer: `Unpredictable, Informal, Challenging and supportive`,
    },
    {
      question: 'How will I learn?',
      answer: `
  - By listening to presentations about various aspects of Nonviolent Communication
  - By participating in small groups and through informal practice with other participants
  - By remembering the purpose of Nonviolent Communication
  - By contributing to other participants and receiving their contributions
      `,
    },
    {
      question: 'What do I learn?',
      answer:
        'We have based this Nonviolent Communication course on the co-creation of a safe container where people from different countries tap into the living energy of an emerging community using Nonviolent Communication. You are able to request what you want to learn, so you get to explore the topics which are really important to you. These may include : social change, conflict resolution, personal growth, relationships, spirituality, parenting, education, workplace, and a special beginner track - many sessions to choose from and all the videos to watch later!',
    },
    {
      question: 'Can I offer workshops during the course?',
      answer:
        'Yes, if a trainer is willing to be present with you, otherwise there is plenty of space for you to lead workshops outside the daily schedule.',
    },
    {
      question: 'What does a VIC cost and what does the fee include?',
      answer:
        'Your contribution consists of a tuition fee for 8 full days, the access to full course documentation, the access to all the videos for at least 6 months. It does not include equipment to join or your internet connection.',
    },
    {
      question: 'How is the fee I pay used?',
      answer:
        'Your contribution enables us to pay CNVC and different service providers we use to make the course work well (like Zoom, Stripe, Cryptpad, Dropbox…), then some resources contribute to special purchases made by the Peace Factory team (lighting, a decent camera…), and the rest of the resources are put into a money pile and shared (using Systemic Consensing to make decisions) between everyone who has worked on the project, according to their needs, including some money for Peace Factory to be able to continue funding scholarships and peace projects throughout the world in a sustainable way.',
    },
    {
      question: 'What are the dates?',
      answer: `
Day 1 - 13th (Friday)

Day 2 - 14th (Saturday)

Day 3 - 15th (Sunday)

- Rest Day - 16th (Monday)

Day 4 - 17th (Tuesday)

Day 5 - 18th (Wednesday)

- Rest Day - 19th (Thursday)

Day 6 - 20th (Friday)

Day 7 - 21st (Saturday)

Day 8 - 22nd (Sunday)

The daily schedule is subject to change to take into account your requests made during the [course Schedule](https://docs.google.com/spreadsheets/d/1az-Z-dDhEgckF5GVmbAKwxNLpoA5vx_XmR2Jg-vFUsY/edit#gid=0).
      `,
    },
    {
      question: 'Why does it last for 8 full days with 2 days off?',
      answer: `The Virtual Intensive Course replaces European Intensive Course which was held at the Peace Factory in France this past 8 years. It was about practising and living NVC every day, being immersed in a language of feelings and needs for 8 full days.

Eating and breathing NVC as an immersive experience.

Science shows that this is exactly what our brains need to break old habits to learn new life-serving habits. Nonviolent Communication is not a thing to DO, it’s a way to BE.

And we’ve taken into account that 8 days in a row would be unmanageable for most of you AND us, so we’ve come up with 2 days off to digest, stretch and MOVE!!`,
    },
    {
      question: 'What time does it start?',
      answer: `This course is designed to be convenient for people living in Africa, Europe, the Middle East, and Asia.

All times quoted are Universal Time Coordinated.
On day 1: the scheduled start of the program (first meeting) starts at
08:30 UTC - London which is:

09:30 - France, Germany, Switzerland

10:30 - Russia

11:30 - South Africa

14:00 - India

15:30 - Thailand

Please check your time using this [time convertor](https://www.timeanddate.com/worldclock/fixedtime.html?msg=Virtual+Intensive+Course+%28VIC%29&iso=20201113T0830&p1=%3A&ah=8&am=10).
      `,
    },
    {
      question: 'What is a “Remembering”?',
      answer: `The Remembering Sessions help participants be aware of the purpose underlying NVC. Participants who wish to share may express this remembering with a short exercise, a ceremony, poem, musical selection, a reading, etc. If you would enjoy doing so, please bring materials to contribute to the Remembering Sessions.
      `,
    },
    {
      question: 'Is my internet connection good enough?',
      answer:
        'You can use a site like [www.speedtest.net](http://www.speedtest.net) to check if your download speed is 3MBPS or more. More technical information here: [system requirements](https://support.zoom.us/hc/en-us/articles/204003179-System-Requirements-for-Zoom-Rooms)',
    },
    /* {
      question: 'The video platform, how does it work?',
      answer: `It’s an easy to use platform and our technical team who are all trained in NVC are here to help you. Technical glitches are a normal part of any virtual course. Rather than panic and blame, they are handled with grace and support.
      `,
    }, */
    {
      question: 'The interactive platform, how does it work?',
      answer:
        'It’s easy to the platform created by our technical team who are all trained in NVC and are willing to support you if you need help. Technical glitches are a normal part of any virtual course. Rather than panic and blame, issues are handled with grace and support.',
    },
    {
      question: 'What is the format?',
      answer: `The format of the course is designed to promote the integration and sustainability of work beyond the course and throughout the following year. There is an option for small groups to stay in active contact once a fortnight and to enjoy monthly mentoring from one of the trainers.

To provide participants with a choice of learning opportunities VIC’s typically operate in a manner that is similar to the principles of Open Space Technology. For more information about the principles, please look at [www.openspaceworld.org](https://www.openspaceworld.org)
      `,
    },
    {
      question: 'How do I enter the course?',
      answer:
        'You will receive access to the Virtual Exchange Platform at least 2 weeks before the course starts to be able to communicate with the course attendees, discuss topics, see the handouts and the videos we are preparing especially for the participants.',
    },
    {
      question: 'What payment options do I have?',
      answer: `We request payment in Euros using a credit card or direct debit (bank transfer). You can book a place on our [tickets page](/tickets).
      If you would like to pay in installments by direct debit, before booking please contact ${contact_name} by ${contact_email}.`,
    },
    {
      question: 'Can I buy a ticket once the course has started?',
      answer:
        'No, because community is at the core of this course, so starting together is especially important (and any child who misses the first day at school can explain this to you), so tickets sales close the day before we start, on the 12th of November 2020.',
    },
    {
      question: 'How to apply for a VIC?',
      answer: `You can apply for this VIC by clicking on this [registration link](/tickets).

If you are applying for a reduced price, we ask that you fill in a **Reduced-resources fund** form. (See the form [here](https://peacefactory.typeform.com/to/JDtABYdF).)

Places are based on the sequence in which applications are received and processed. Once the VIC is filled, Peace Factory creates a waiting list. If the VIC is full when you apply, you will see information on the registration form and your name is automatically placed on the waiting list in the order received. Peace Factory will not request payment unless/until you are promoted from the waiting list and registered into the VIC. There is no guarantee that a space will open up.

Once you’ve booked, you will receive a message notifying you of the status of your application.
      `,
    },
    {
      question: 'Are sessions recorded?',
      answer: `We are very committed to spreading empathy skills, and are therefore keen to create recordings of trainers in sessions (but not small group practice), that may be published for educational purposes and to promote NVC. We would really like the VIC to be a space in which we can all freely express ourselves and feel safe, so if you have concerns about recording, please read the information available here: [tinyurl.com/y39jw467](https://tinyurl.com/y39jw467). Please do not register for the VIC if neither of the strategies presented in this document supports you.

_These recordings are accessible for the next 6 months so you can carry on learning from the sessions._`,
    },
    {
      question:
        'I am worried about my privacy. What are the measures you take ?',
      answer: `We all want to feel secure and we want everybody to feel secure too.  The virtual platform has been designed by experts with privacy in mind. We are aware that during the course people may share personal information. Our data collection is the bare minimum to conform to European law and our Terms of Invitation (ToI) include a written agreement to withhold from registering any part of the VIC and to respect the privacy of everyone’s personal details unless they have written informed consent for another participant.
      `,
    },
    {
      question: 'I want to join with my partner. Is this okay?',
      answer: `Of course, you’re welcome! You have paid the couple price with two tickets, however if it’s at all possible, we recommend you have two screens because if you only have one screen, a) you have to sit further away from the screen so that you can both be seen and b) one screen means you will always be in the same session!

When you exchange between yourselves, please make sure you’re muted and please check from time-to-time whether other people might benefit from your reflections.`,
    },
    {
      question: 'My English is not fluent. Are you sure I can participate?',
      answer: `Most of the team and participants speak English as a second or third language, so the English spoken is simple and slow. But if you’d like to check it out, please book a 10 minute exchange with Irmtraud by contacting her at [${irmtraud_email}](mailto:${irmtraud_email})`,
    },
    {
      question: 'What are the VIC cancellations and refunds policies?',
      answer: `Peace Factory incurs significant expenses with every application processed, so we request that you refrain from buying a ticket for the course unless your plans are firm, and you are confident of your ability to attend.

In the event that the VIC 2020 does not take place, the VIC enrollee agrees that Peace Factory shall have no obligation to compensate the VIC enrollee beyond the tuition fee they paid.

In the event that you cancel your VIC application, Peace Factory will ask how you would like us to handle the ticket you have already bought. At your request, if you have registered and decide to cancel your place, you may offer the place to someone you know or to someone on the reduced-resources fund list.`,
    },
    {
      question: 'Does Peace Factory offer financial support?',
      answer: `Peace Factory has a limited reduced-resources fund for VICs. Below are the criteria which we take into consideration.

Please remember: To be eligible for consideration, please submit your completed [reduced-resources fund form](https://peacefactory.typeform.com/to/JDtABYdF). Request at least one month before the start of the VIC. The form is here. Late applications will not be considered.

To minimise the chance of disappointing you, we would like you to know that Peace Factory’s reduced-resources funding is limited. We do not expect to give reductions to all, or even most, of those who apply. Please note also that Peace Factory rarely offers reductions to applicants other than those from developing countries. We use the following criteria in selecting recipients:

1. Potential of applicants to share NVC widely, especially among populations not already reached.
2. Economic need, especially if resulting from circumstances beyond one's control.
3. Previous NVC training (those with more training will generally be given preference over those with less training).
4. Connection to the CNVC community, and previous contribution to the Peace Factory community.
5. Except in extraordinary circumstances, reductions are not offered to people who have previously attended an NVC intensive course.

Please fill out this [reduced resources form](https://peacefactory.typeform.com/to/JDtABYdF) if you would like financial support.
      `,
    },
    {
      question: 'What is the waiting list procedure?',
      answer:
        'If the VIC is full when you apply (and you will see this information on the [Tickets page](/tickets) along with the questionnaire), your name is automatically placed on the waiting list in the order received, and your payment is not requested unless/until you are promoted from the waiting list and registered into the VIC. There is no guarantee that a space will open up.',
    },
    {
      question: 'Why do some people attend the course each year?',
      answer: `Even the more experienced participants don’t find an intensive course repetitive. Course materials are continually evolving, so it’s somewhat different from year to year. Additionally people report that the material is so rich that they hear something different even if a topic is the same! Most important, peer learning is an integral part of our course. Having applied the material in their lives for a year, they enrich and broaden the programme for everybody. They may coach during mediation role-plays, offer empathy and support between training sessions so first-time participants get all the support they could want throughout the course.`,
    },
    {
      question:
        'Is attendance at an intensive training like this VIC still required to become a CNVC Certified Trainer?',
      answer: `In an effort to support clarity and easy access to information, here is the updated language from CNVC’s website:

For those who wish to become CNVC Certified Trainers, contact your assessor to see how a VIT may help you to fulfill the certification requirements for participating in an intensive training. A lot of them request that if a candidate does not attend an IIT before becoming certified, they have:

- Multi-day, in-depth, residential training
- International NVC experience
- Areas fully experienced: NVC community (ongoing peer support), spirituality, and social change
- Significant NVC experience with multiple CNVC certified trainers and mentors
- Established a connection to CNVC, have a clear priority to support our mission, willing and able to renew annual certification.

All VIC participants receive a certificate confirming their participation in our intensive course.
      `,
    },
    {
      question: 'Can I join your team?',
      answer: `Yes! we welcome the support of volunteers, especially for Zoom support and marketing-related tasks. Please write to [${contact_email}](mailto:${contact_email}).`,
    },
    {
      question: 'I still have a question',
      answer: `If you have questions that aren’t included here, you are invited to write to [${contact_email}](mailto:${contact_email}) so that these FAQ get richer!`,
    },
  ],
  trainers: [
    {
      name: 'Frank Gaschler',
      image_url: '/images/trainers/frank.png',
      bio: `My current passion revolves around four life themes:

  - without having to do anything for it, to be welcome;
  - to have a space in which I can also stand up;
  - instead of having to control, to be held in trust; and
  - instead of fulfilling others dreams, be alive.

My passion is to experiment with NVC outside the box, far away from the boundaries of words and language. I like to concentrate on intuition, empathic presence and body language.

My social change project “giraffe’s dream” aims at introducing and spreading NVC in kindergartens, preschools and primary schools. This program has become the biggest social change project in this field.

I am a CNVC certified trainer and assessor in the certification process of the CNVC. My current passion revolves around the 4 life themes:
To be welcome - without having to do anything for it, to have a space for which I can also stand up, to be held in trust instead of having to control and be alive instead of fulfilling others dreams.

I live with Gundi, my wife, near Munich, Germany.
      `,
    },
    {
      name: 'Godfrey Spencer',
      image_url: '/images/trainers/godfrey.png',
      bio: `
I was trained by Marshall Rosenberg and became a CNVC Certified Trainer in 2001.  I’ve been approached by universities, professional organisations of lawyers, the judiciary, university hospitals, companies, business schools and governments... for which I act as a coach and mediator, as well as a teacher of mediation and negotiation

I thoroughly enjoy the sense of belonging generated before, during and after intensives.  I moved from interpreting IITs for Marshall in the French-speaking world to assisting him when Marshall was IIT lead-trainer.

I am especially turned on by life in the present, experiencing how past and future can become eminently manageable when brought into the here and now.  Intensives produce order in chaos!  The unexpected can prove to be a real pedagogue!  Pushing back the borders of classical NVC helps learners to integrate the power of this process in their day-to-day interactions.

Social change stems from inner change.  Let’s remember that inner change is the real challenge, while changing the world is a perilous illusion.  Participants on my courses say how much they enjoy the passion, the novelty, the rigour, the the language skills, the clarity…  and the impression that time flies!
      `,
    },
    {
      name: 'Irmtraud Kauschat',
      image_url: '/images/trainers/irmtraud.png',
      bio: `My passion in NVC is reconciliation, mediation, peacebuilding and supporting people in sharing NVC and social change.

A medical doctor by training, I’ve offered NVC courses in different countries, including Serbia/Croatia, Kenya, Israel/Palestine, Iceland, Ukraine and more recently in Somalia.

I have expertise in reconciliation between warring groups, like in former Yugoslavia (in 1996 especially with youth from Serbia and Croatia), in Kenya (with different communities that had been affected by the post-election violence in 2007/2008), with two tribes from the north that had been at war with each other for about 30 years, and most recently with people from Israel/Palestine, Ukraine and Somalia.

Since 2017, I have been accompanying candidates on their certification path and I’ve co-authored two books with exercises to practise NVC.
    `,
    },
    {
      name: 'Louise Romain',
      image_url: '/images/trainers/louise.png',
      bio: `My vision is to disrupt “business as usual” to achieve social change.

I get a high from spending NVC time training, speaking, writing and I particularly enjoy working with Liberating companies. The rest of the time I don’t do much, preferring to just be, although (almost magically) things do get done, including (occasionally) housework.

I ground my work in centering the experiences of historically underrepresented communities, using systemic approaches to address inequities, especially the power of being heard by the group.

I pride myself on making mistakes, being a not-quite-as-cool as I would have liked to have been Mum. Grateful for these learning experiences, my children are now adults but they are still keeping me on my toes, still learning about how to relate in ways that serves everyone’s needs. I’m a thinker, an adventurer in life, and often a cool and fun adult presence to my friends children.

I co-founded a small eco community (where I live), which has become known for offering courses in NVC and group decision-making. I’m currently working on a book and podcast series about gender and power through the lense of NVC.
  `,
    },
    {
      name: 'Magdalena Sendor',
      image_url: '/images/trainers/magdalena.png',
      bio: `I love to help to build harmonious relations, with oneself and others, in the authenticity and the respect of each one.
I specialise in conflict resolution, organising team meetings and circle talks based on the model of sociocracy. I work with individuals, schools, non-governmental organisations and businesses, teaching at Collegium Civitas, a private university in Warsaw, as part of postgraduate studies in Nonviolent Communication.

Attentive to freedom and the spirit of responsibility, I’m particularly interested in cooperation with democratic schools and companies that develop new management styles (teal organisations).
My strong point is my passion for learning. I’m constantly expanding my knowledge, currently developing skills by combining CNV and conscious body-work.

I lived in France for seven years, where I studied and worked. For 18 years, I’ve been living in a bi-cultural and bilingual family whose diversity and challenges give me a lot of joy and contribute to reflection. I have written two books (in Polish) on proximity parenting.
I work in three languages: Polish, French and English.
  `,
    },
  ],
};
