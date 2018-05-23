---
layout: post
title:  "Making Conference Badge Better"
date:   2018-05-18 12:00

image: "/assets/making-conference-badge-better-hero.png"

tags: [design, typography]
---

A couple of weeks ago, I've visited the [HI-Tech Nation](https://probusiness.io/event/4168-hi-tech-nation-forum-in-belarus-one-of-the-worlds-best-countries-for-hi-tech-business.html) conference. It is an annual conference that takes place in Minsk, Belarus. Its topics are the future of IT, place of IT in traditional industries, and entrepreneurship.

As usual with conferences, every participant has been supplied with a badge. Here's a badge from the conference (not mine, but you get the idea):

![HI-TECH Nation badge example]({{ site.baseurl }}/assets/making-conference-badge-better-example.jpg){: .image--original-size-small}

In this post, I'd like to reason about how the conference badge could be made better. The goal is not to brag about the conference or its organizers. They did an excellent job by bringing together a great set of speakers. I just want to perform a thought experiment on how such a small part of the conference as badges can be made better.

## What I like in this badge
Before thinking about improvements, let's name things that are already good with the badge:
1. __Size of the badge__---the size of the badge is 105 × 148 mm (4.13 × 5.83 inches). The badge doesn't feel bulky, and it fits all the information.
2. __Color-coding of the badge__---the color of a badge differs whether you are a participant, a speaker, or a staff member. It makes it easy to recognize the type of a person in a crowd. The badge color matches the lanyard color, which is a nice detail.
3. __Useful flip side__---the flip side contains the agenda for two days of the conference. It proved to be very convenient.


## What I would improve
### 1. Increase font size
__Problem__: the typeface used for the badge is [Roboto](https://fonts.google.com/specimen/Roboto) from Google. I would guess that organizers used around 28 pt font size for the first and last name in bold, and about 18 pt for a company name. This is not enough to read a person's name from the 2--3 meters distance. To make networking more effective, it should be easy to get a person's name easily.

__How to fix__: I would set the font size for the first name to 34-36 pt. This way the badge would still have enough space for long names, but the first name would be much easier to read. The last name is less important, so I'd use normal weight instead of bold and, probably, set it to 2-4 pt smaller than the first name.

Take a look at the difference:
<link href="https://fonts.googleapis.com/css?family=Fira+Sans:500|PT+Sans|Roboto:400,700" rel="stylesheet" />

<span style="font-family: 'Roboto'; font-size: 28pt; font-weight: bold;"> Дмитрий </span> 28 pt

<span style="font-family: 'Roboto'; font-size: 36pt; font-weight: bold;">Дмитрий </span> 36 pt

### 2. Make lanyard shorter
__Problem__: the length of the lanyard is about 90 cm. I'm about 175 cm high, which places the badge about 35 cm under my chin. To give that in perspective---my name on the badge would be around my bellybutton. Sum this with the small font size and that makes the info on a badge quite unreadable. Oh, and with length like this, the badge starts to swing when walking.

__How to fix__: Make lanyard 30 cm shorter. This would make the distance between a chin and a badge around 15--20 cm, which would be around chest level. This is much more comfortable to wear and to scan.

![lanyard length example]({{ site.baseurl }}/assets/making-conference-badge-better-lanyard-length.jpg){: .image--original-size-small}

### 3. Do not use Roboto
__Problem__: [Roboto](https://fonts.google.com/specimen/Roboto) is a great typeface for UI interfaces, but it doesn't look that good in a large bold font on badges. And my personal opinion is that Roboto's Cyrillic is not beautiful.

__How to fix__: Avoid bold font and go for a bigger font size with a normal weight instead. Or, even better, use another free font available from [Google Fonts](https://fonts.google.com) or elsewhere.

<span style="font-family: 'Roboto'; font-size: 28pt; font-weight: bold;"> Дмитрий </span> Roboto, bold, 28 pt

<span style="font-family: 'Roboto'; font-size: 30pt; letter-spacing: -1.0px;"> Дмитрий </span> Roboto, normal, 30 pt

<span style="font-family: 'PT Sans'; font-size: 30pt; font-weight: 700;"> Дмитрий </span> PT Sans, bold, 30 pt

<span style="font-family: 'Fira Sans'; font-size: 30pt; font-weight: 500;"> Дмитрий </span> Fira Sans, semibold, 30 pt


Next time you'll be visiting a conference, I encourage you to look at your badge.

How can it be made better?
