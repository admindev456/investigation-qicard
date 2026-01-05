"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

type TranscriptSegment = {
  startTime: number;
  endTime: number;
  text: string;
};

type TestimonialVideo = {
  id: string;
  videoUrl: string;
  title: string;
  description?: string;
  transcript: TranscriptSegment[];
};

const testimonialVideos: TestimonialVideo[] = [
  {
    id: "q1",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q.mp4",
    title: "Account Breach & Data Sharing",
    description: "Citizen discovers unauthorized purchases made in USA while physically located in Karbala, company blames him",
    transcript: [
      { startTime: 0, endTime: 2, text: "Hi, my Qi card. Okay." },
      { startTime: 2, endTime: 4, text: "Goodbye, Qi." },
      { startTime: 4, endTime: 7, text: "What does this company do? I'll tell you what it does." },
      { startTime: 7, endTime: 12, text: "When you open an account with them and deposit your money," },
      { startTime: 12, endTime: 16, text: "they go and share your information and give them" },
      { startTime: 16, endTime: 20, text: "the account number and your password, and they withdraw your money." },
      { startTime: 20, endTime: 24, text: "And when you go to confront them, okay, I have an iPhone." },
      { startTime: 24, endTime: 29, text: "Purchases are being made with this card of mine through Google." },
      { startTime: 29, endTime: 32, text: "Where is its location? In the USA, in America." },
      { startTime: 32, endTime: 36, text: "And I'm at the edge of the world, at the end of Karbala." },
      { startTime: 36, endTime: 40, text: "Okay, you go and tell them, 'Uncle, you have two things:'" },
      { startTime: 40, endTime: 44, text: "'Either you are sharing [info], or there is a loophole in the system, there's hacking involved.'" },
      { startTime: 44, endTime: 47, text: "'Look at your AM transactions.'" },
      { startTime: 47, endTime: 49, text: "They tell you, 'No, you shared your information.'" },
      { startTime: 49, endTime: 53, text: "You tell them, 'I'm a sane, adult person, how would I share my livelihood information with someone?'" },
      { startTime: 53, endTime: 56, text: "They say, 'No, you shared it.'" },
      { startTime: 56, endTime: 59, text: "No one should download this app and no one should..." },
    ]
  },
  {
    id: "q2",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q2.mp4",
    title: "Theft While Sleeping",
    description: "User physically destroys card on camera after waking up to find 250,000 IQD stolen overnight",
    transcript: [
      { startTime: 0, endTime: 5, text: "[Breaks card]" },
      { startTime: 5, endTime: 15, text: "Do you know why? Yesterday, I don't know how I got robbed. I didn't send a picture of the Mastercard, nor did I send anything, only the number, which is the 16 digits, only." },
      { startTime: 15, endTime: 23, text: "Just while I was sleeping, I woke up in the morning and found all my money gone. How? I don't know." },
      { startTime: 23, endTime: 30, text: "I called the company, 'Hey, this and that happened to me,' they said, 'Go file a lawsuit in court,' or something like that." },
      { startTime: 30, endTime: 36, text: "Many people have fallen for this, and they go to court and get nothing back." },
      { startTime: 36, endTime: 44, text: "So, the app, honestly, I don't recommend it anymore, and don't put any money in it." },
      { startTime: 44, endTime: 49, text: "I had 250,000 [IQD] in the Mastercard, and they're all gone. And the theft keeps happening." },
      { startTime: 49, endTime: 54, text: "I'm seeing the notifications, and I can't do anything. I logged out of the account, and the same thing happened again. I don't know how." },
      { startTime: 54, endTime: 60, text: "Anyway, this is a lesson for you guys, so that no one puts their money in any app. Okay?" },
      { startTime: 60, endTime: 62, text: "Goodbye." },
    ]
  },
  {
    id: "q3",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q3.mp4",
    title: "Warning Video Deleted by Company",
    description: "User's theft warning video mass-reported and deleted across all platforms by the company",
    transcript: [
      { startTime: 0, endTime: 4, text: "After my money was stolen from the card and I posted a video to warn people," },
      { startTime: 4, endTime: 7, text: "I woke up in the morning to find the video deleted from all platforms." },
      { startTime: 7, endTime: 13, text: "And the video, anyone who sees it will know that the purpose of it is awareness and warning people so their money doesn't go away." },
      { startTime: 13, endTime: 17, text: "So why was it deleted? How? A report. From where? From the company." },
      { startTime: 17, endTime: 21, text: "Oh! But the video's benefits for you are more than its harms, because I'm raising awareness for your users," },
      { startTime: 21, endTime: 25, text: "whom you should be protecting and protecting their money." },
      { startTime: 25, endTime: 28, text: "But with this action, you're telling me that I don't want anyone to raise awareness for people." },
      { startTime: 28, endTime: 33, text: "So the reason why you don't want people to protect their cards, what is it? I don't know." },
      { startTime: 33, endTime: 39, text: "I, for one, had trust in the company and that they were truly interested in protecting users." },
      { startTime: 39, endTime: 42, text: "But after this action, unfortunately, the trust is completely gone." },
      { startTime: 42, endTime: 45, text: "And since you call your company 'international'," },
      { startTime: 45, endTime: 48, text: "we truly hope it will be international in its actions," },
      { startTime: 48, endTime: 51, text: "and that you accept opinions, even if they are annoying to you." },
      { startTime: 51, endTime: 57, text: "And on the red app [YouTube], I posted a detailed video for you on how to protect your money and your card." },
      { startTime: 57, endTime: 58, text: "Goodbye." },
    ]
  },
  {
    id: "q4",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q4.mp4",
    title: "11 Million IQD Vanished",
    description: "Emotional breakdown as user discovers 11 million IQD vanished from account with no transaction record",
    transcript: [
      { startTime: 0, endTime: 11, text: "May God not grant you success, my account in the card was 33 million [IQD], I go back to it and find it 22 million, why? Isn't it forbidden? God is sufficient for us and He is the best disposer of affairs." },
      { startTime: 11, endTime: 14, text: "O people, now where do I get it from?" },
      { startTime: 14, endTime: 30, text: "What is the solution now? I want to ask what is the solution now? I talk to the card issuer, I tell him I have 33 million and I have a picture of it, he tells me it's 22 million and 178 [thousand], well where is the rest of the money? Shouldn't I know?" },
      { startTime: 30, endTime: 36, text: "May God not grant you success, God willing, I am truly tired, I swear by God." },
      { startTime: 36, endTime: 48, text: "The one who tells me to do an account statement, he tells me 'Oh, by God, there is nothing, look', I told him 'Well, and people are being robbed', what should I say to him?" },
      { startTime: 48, endTime: 55, text: "Pickpockets, where should I hide [money] anymore? With Islam? Even if I go to Muslims, Islam [people] also pickpocket me, they steal from me." },
      { startTime: 55, endTime: 60, text: "And people write to me 'ill-gotten money goes to ill-gotten ends'." },
      { startTime: 60, endTime: 67, text: "It's not ill-gotten money, it's not ill-gotten money, me and ill-gotten [money] anymore, I'd die for ill-gotten money anymore, wait." },
      { startTime: 67, endTime: 80, text: "People who are robbed through their Qi card, I mean, does the theft show up in the app or does the theft not show up, by God? Because I talk to them and they say it doesn't show up." },
      { startTime: 80, endTime: 90, text: "There is nothing, what am I, a donkey? I left the 33 million, what am I, a donkey? Aren't they transfers? I have receipts, what am I, an animal, I don't know?" },
      { startTime: 90, endTime: 106, text: "Just answer me the question, when you are robbed, does the theft show up or not? It's gone, enjoy it, it's on you now that you stole, Qi card, where should I hide my money anymore? Where? Where?" },
      { startTime: 106, endTime: 115, text: "[Singing/Crying] God, how much I loved this house, I face your beautiful eyes and sing, and all the pain from you hurts me..." },
    ]
  },
  {
    id: "q5",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q5.mp4",
    title: "Ministry of Finance Testimony",
    description: "W5 News: Ministry of Finance legal representative confirms systematic theft by convicted Bahaa",
    transcript: [
      { startTime: 0, endTime: 9, text: "W5 News obtained an official document of the testimony of the legal representative of the Ministry of Finance about a major theft of employee and retiree salaries." },
      { startTime: 9, endTime: 15, text: "The document shows the content of the judicial testimony of the legal representative of the Ministry of Finance." },
      { startTime: 15, endTime: 29, text: "It clearly and explicitly revealed the manipulation, the extent of the damage, and the theft of salaries of two large segments of Iraqis: retirees and state employees whose salaries are domiciled with the Qi Card company." },
      { startTime: 29, endTime: 39, text: "The legal representative confirmed that all the thefts were orchestrated by the convict Bahaa Abdul Hussein Abdul Hadi, the general manager of the Qi Card company." },
      { startTime: 39, endTime: 46, text: "This is one of hundreds of thefts he committed, noting that the initial amount of the thefts reached more than one trillion and 425 billion dinars." },
    ]
  },
  {
    id: "q6",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q6.mp4",
    title: "Babil Retirees Question Deductions",
    description: "Babil governorate retirees and employees demand answers on billions in unexplained monthly deductions",
    transcript: [
      { startTime: 0, endTime: 26, text: "In Babil, a number of retirees and employees in the governorate questioned the amounts being deducted while receiving their salaries from Qi Card outlets, expressing their surprise at the lack of follow-up on these funds after thefts were revealed in the Qi Card company managed by the convict Bahaa Abdul Hussein, and the scandal of his theft of trillions from the funds of employees and retirees." },
      { startTime: 26, endTime: 29, text: "[News channel logo/transition]" },
      { startTime: 29, endTime: 43, text: "I receive my salary from the outlets. The outlet takes a deduction. This deduction that is being taken—is it for a government department, a private entity, a joint-stock company, or a mixed one?" },
      { startTime: 43, endTime: 55, text: "This is the question we are asking. It collects from thousands of employees. The amount being collected is in the billions per month. Whose share is it becoming?" },
      { startTime: 55, endTime: 67, text: "I mean, if the retiree's salary is small, and you come and take fees, then where are these amounts going? This is the inquiry we are making." },
      { startTime: 67, endTime: 84, text: "Regarding the Qi Card company, there are deductions happening from the cards. I mean, when I receive my salary, I find a deduction. For example, I have the app installed on my mobile, it shows 400,000 [IQD] is deposited. I go [to the outlet] and find it's 397,000." },
      { startTime: 84, endTime: 95, text: "The outlet owner takes 2,000, so I receive 395,000. This 5,000 dinars multiplied by millions of employees—there's money, I mean, there's money missing. There are people benefiting from this issue." },
      { startTime: 95, endTime: 107, text: "I mean, in other countries, competition should be opened. It shouldn't just be this company. Open competition, bring in about 20 companies, and whoever provides the best service at the lowest price, I give it to them." },
      { startTime: 107, endTime: 122, text: "I mean, it shouldn't be exclusively this company. Why is it this company that is taking the amounts, benefiting, and deducting from the employee's salary? Knowing that the Iraqi employee has been working since the sixties and seventies until today, receiving the salary manually without any deduction." },
      { startTime: 122, endTime: 128, text: "Now deductions are happening and the employee is being harmed. So I want to see where these amounts are going." },
      { startTime: 128, endTime: 140, text: "Problems in paying the salaries of retirees and employees, especially with the Qi Card company. We hope these problems will be followed up and these violations monitored." },
      { startTime: 140, endTime: 151, text: "Cases of illegal deductions from employees' salaries are occurring. We urge the relevant authorities to monitor these cases and companies and restore their rights." },
      { startTime: 151, endTime: 162, text: "We hope their salaries will be delivered in full because these are their entitlements; they worked hard and gave so much to this country so they could receive a full, undiminished pension." },
      { startTime: 162, endTime: 170, text: "Companies, especially the Qi Card company, are deducting from the salaries of employees and retirees without any right." },
      { startTime: 170, endTime: 176, text: "We hope the security authorities will monitor and track these cases and hold them accountable according to the law." },
    ]
  },
  {
    id: "q7",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q7.mp4",
    title: "1.5 Billion IQD Stolen from Fuel Stations",
    description: "Fuel station owners report 1.5+ billion IQD stolen overnight, company deflects blame to bank",
    transcript: [
      { startTime: 0, endTime: 5, text: "More than a billion and a half billion dinars, the total amount stolen from fuel station owners in one of the Iraqi governorates." },
      { startTime: 5, endTime: 11, text: "But how did the theft happen? Overnight and under mysterious circumstances," },
      { startTime: 11, endTime: 23, text: "investors and fuel station owners were surprised by the withdrawal of their money and its disappearance from their smart cards." },
      { startTime: 23, endTime: 30, text: "One of them had 45 million dinars stolen from his Qi Card." },
      { startTime: 30, endTime: 34, text: "Another had 35 million dinars withdrawn from his card." },
      { startTime: 34, endTime: 38, text: "A third had 600 million dinars withdrawn from his card, and so on." },
      { startTime: 38, endTime: 46, text: "The shock is that the owners of these cards confirm they don't know how they were robbed, nor how the money was withdrawn," },
      { startTime: 46, endTime: 52, text: "or if that money was transferred from the Qi Card without their knowledge or consent." },
      { startTime: 52, endTime: 57, text: "When they turned to the relevant authorities, they received a shocking response." },
      { startTime: 57, endTime: 66, text: "Let's listen. Of course, the right to respond is guaranteed for those who wish to respond and clarify." },
      { startTime: 66, endTime: 74, text: "Our accounts are all zeroed out. Where is the privacy in this matter? Where is the security? Where is the immunity?" },
      { startTime: 74, endTime: 75, text: "What are your Qi Card problems?" },
      { startTime: 75, endTime: 82, text: "The biggest problem with the Qi Card is that I have the card in my pocket, yet it's hacked." },
      { startTime: 82, endTime: 86, text: "How? Because how was the money withdrawn without my knowledge?" },
      { startTime: 86, endTime: 87, text: "How much was withdrawn from your Qi Card?" },
      { startTime: 87, endTime: 90, text: "I had 45 million withdrawn from the Qi Card." },
      { startTime: 90, endTime: 94, text: "I had 34 [million]... I had 40 million..." },
      { startTime: 94, endTime: 98, text: "I had 60... 44 million..." },
      { startTime: 98, endTime: 101, text: "Where is the secrecy? Where is the privacy? Where is the security?" },
      { startTime: 101, endTime: 103, text: "You followed up with them, what did they tell you?" },
      { startTime: 103, endTime: 106, text: "We followed up with Qi Card, for us..." },
      { startTime: 106, endTime: 110, text: "For us, the problem happened yesterday, and it's considered a holiday." },
      { startTime: 110, endTime: 116, text: "So we called the Qi Card people, they justified it by saying the problem isn't with them." },
      { startTime: 116, endTime: 119, text: "Then who?" },
      { startTime: 119, endTime: 122, text: "They justified it as being with the bank, the Industrial Bank." },
      { startTime: 122, endTime: 128, text: "The Industrial Bank today said 'I'm not responsible' and threw it back on the Oil [Ministry]." },
      { startTime: 128, endTime: 134, text: "The Oil [Ministry] says 'I'm not responsible, this is a case between Qi Card and the Industrial Bank'." },
      { startTime: 134, endTime: 141, text: "So for us, the question that puzzles us, really, is how does the transfer process happen without the owner's consent?" },
      { startTime: 141, endTime: 146, text: "Besides these problems, you told me that sometimes it's deducted from owners..." },
      { startTime: 146, endTime: 152, text: "Our problems, sir, regarding our problems, one of the simple problems... I'll be brief for the sake of the talk." },
      { startTime: 152, endTime: 154, text: "If the Prime Minister were in front of you, what would you tell him about the Qi Card company?" },
      { startTime: 154, endTime: 161, text: "Failure! Failure! 100% failure! Because its commissions are back-breaking." },
      { startTime: 161, endTime: 164, text: "Because its case is unstudied." },
      { startTime: 164, endTime: 170, text: "What is the relationship of companies mediating with the Central Bank? We are a state." },
      { startTime: 170, endTime: 175, text: "A state of institutions and a state of law. Why do I bring in companies that no one is responsible for?" },
      { startTime: 175, endTime: 181, text: "Piracy companies! Piracy! They take 5% from us. This is what happened to us today." },
      { startTime: 181, endTime: 185, text: "Why isn't our link directly with the Central Bank?" },
      { startTime: 185, endTime: 188, text: "Now, approximately how much money was taken from you as a whole?" },
      { startTime: 188, endTime: 194, text: "More than a billion and 500 [million]. By the way, for your information, we are being asked for another billion." },
      { startTime: 194, endTime: 198, text: "It was more than a billion and a half. We were crushed, I mean crushed." },
      { startTime: 198, endTime: 200, text: "This is just the center?" },
      { startTime: 200, endTime: 203, text: "No, Babil governorate as a whole. I mean, they took us one by one." },
      { startTime: 203, endTime: 209, text: "Regarding us, we caught up... if we hadn't caught up, I mean if more amounts had been deposited, they would all be gone." },
      { startTime: 209, endTime: 215, text: "Okay, you said in the coming hours you'll be forced to close if it's not settled?" },
      { startTime: 215, endTime: 222, text: "For us currently, we want to proceed in the direction of the law, really." },
      { startTime: 222, endTime: 227, text: "For us, we are conveying [this], you are the fourth estate, Mashallah." },
      { startTime: 227, endTime: 231, text: "Certainly, and with all honesty we convey it." },
      { startTime: 231, endTime: 234, text: "So we are conveying our voice and our complaint to you." },
      { startTime: 234, endTime: 240, text: "And hopefully after we finish, we will now file a complaint with the Ministry of Oil." },
      { startTime: 240, endTime: 244, text: "And file a complaint against Qi Card, and file a complaint in court." },
      { startTime: 244, endTime: 252, text: "And if all these things don't lead to a result, then we'll be forced to close down." },
      { startTime: 252, endTime: 256, text: "Because today, as an investor, the smallest station has more than 40 workers." },
      { startTime: 256, endTime: 262, text: "So for me, if my money is brought from here and goes from there without me knowing," },
      { startTime: 262, endTime: 266, text: "and this problem we've been suffering from for a year and a half." },
      { startTime: 266, endTime: 270, text: "From a year and a half until now, money has gone from us and we don't know where." },
      { startTime: 270, endTime: 274, text: "You even have a problem that sometimes it's deducted... I mean, the citizen comes, takes fuel, it doesn't go into your account?" },
      { startTime: 274, endTime: 282, text: "The citizen comes, we fill him up with gasoline, he gives his Qi Card, the card comes out rejected." },
      { startTime: 282, endTime: 286, text: "He's forced to pay cash. Let's assume 25,000. The citizen leaves." },
      { startTime: 286, endTime: 291, text: "Two hours later, a notification comes on his mobile that 25 was deducted from him." },
      { startTime: 291, endTime: 295, text: "He comes back to ask for it from you?" },
      { startTime: 295, endTime: 299, text: "He comes back to me and says 'I had a deduction, give me the 25'. I don't want to get into problems." },
      { startTime: 299, endTime: 305, text: "I'll give him the 25. The 25 is gone. I didn't receive it, nor did I get it, and it's gone. It's gone from the citizen and gone from me." },
      { startTime: 305, endTime: 307, text: "Thank you very much." },
      { startTime: 307, endTime: 310, text: "And we don't know what the result of this is, we don't understand." },
      { startTime: 310, endTime: 311, text: "Thank you very much." },
      { startTime: 311, endTime: 318, text: "So, the Qi Card company tells them 'the story isn't with me, go to the Industrial Bank'." },
      { startTime: 318, endTime: 324, text: "And they went to the bank, it tells them 'your topic isn't with me, it's with the Oil [Ministry]'." },
      { startTime: 324, endTime: 330, text: "And they went to the Oil [Ministry], it tells them 'your story isn't with me, it's with Qi Card and the bank'." },
      { startTime: 330, endTime: 338, text: "And so on, one throws them to the other, and your money is gone, O Saber, as they say, of course." },
      { startTime: 338, endTime: 344, text: "This is the story of the fuel station owners in Babil who were subjected to theft and hacking of their bank cards." },
      { startTime: 344, endTime: 349, text: "They are demanding today that the Prime Minister intervene and conduct an immediate investigation and hold those responsible accountable and return their stolen money." },
      { startTime: 349, endTime: 355, text: "They threatened to resort to the judiciary and close their stations in case their issue is ignored and their money is not recovered." },
    ]
  },
  {
    id: "q8",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q8.mp4",
    title: "Where Did My Money Go?",
    description: "Desperate plea from user whose savings vanished—company offers no explanation",
    transcript: [
      { startTime: 0, endTime: 9, text: "Qi Card company, curse your parents, may God not grant you success. My account in the card was 33 million [IQD], I go back to it and find it 22 million, why? Isn't it forbidden?" },
      { startTime: 9, endTime: 19, text: "I just want to know where the money went. Where did the money go? I just want to understand. I left them for a time of need. The money in the card, where did it go?" },
      { startTime: 19, endTime: 35, text: "What is the solution now? I want to ask what is the solution now? I talk to the card issuer, I tell him I have 33 million and I have a picture of it, he tells me it's 22 million and 178 [thousand], well where is the rest of the money? Shouldn't I know?" },
      { startTime: 35, endTime: 38, text: "May God not grant you success, God willing, I am truly tired." },
      { startTime: 38, endTime: 40, text: "God is sufficient for us and He is the best disposer of affairs." },
      { startTime: 40, endTime: 42, text: "Now where do I get it from?" },
      { startTime: 42, endTime: 44, text: "I swear by God, I'm tired." },
    ]
  },
  {
    id: "q9",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q9.mp4",
    title: "Document Evidence: Qi Card Knew",
    description: "Documents show same person withdrew 5 times in one day—proving Qi Card knew about fraud",
    transcript: [
      { startTime: 0, endTime: 6, text: "O people, I swear by the blood of all the martyrs, I swear by the blood of Hussein, if I had authority over these people..." },
      { startTime: 6, endTime: 15, text: "...or if the person in authority hears me, I would make their trial public and execute them in the street." },
      { startTime: 15, endTime: 23, text: "And whoever comes to tell me about human rights, I'll slap him so hard I'll send him further than Sinjar." },
      { startTime: 23, endTime: 29, text: "What brought Qi Card, Allawi? What brought Qi Card?" },
      { startTime: 29, endTime: 41, text: "I spoke, now consider me crazy, consider me insane, consider me... give me any label, uncle. Mr. Ali Al-Alaq, why didn't you listen to me?" },
      { startTime: 41, endTime: 52, text: "There is a story that I will show you now, which is related to the issue of withdrawals, and I will show you how Qi Card is involved in this story." },
      { startTime: 52, endTime: 72, text: "Look at the sections: the card number, the right field, followed by the transaction sequence, then the transaction amount, and then the date and time of the transaction." },
      { startTime: 72, endTime: 89, text: "There is a person with the same card, which is this one, card 55569... look at how he withdrew, how many times did he withdraw?" },
      { startTime: 89, endTime: 106, text: "I'm telling you just about March: on March 2, 2023, he withdrew at 7:25; on March 8, he also withdrew at 9:13..." },
      { startTime: 106, endTime: 132, text: "On March 8, the same day, he withdrew at 9:36, then at 38 minutes past, then on March 8, 2023, he withdrew at a quarter to 12. On March 14, the boy also withdrew at 4:58, two minutes to 5." },
      { startTime: 132, endTime: 155, text: "This indicates forgery operations; this is the document that the investigative committee took from Qi Card. This document is now before you, proving that they knew and were aware that there is one person being given [money] five times in a single day." },
      { startTime: 155, endTime: 173, text: "Therefore, they knew, but they didn't know that the committee would reach [them]. Well, since you knew and it appeared to you, why didn't you take action? Meaning Qi Card is the real culprit in these cases." },
      { startTime: 173, endTime: 183, text: "This is one document from a set of documents held by the committee and will be investigated, so which of the favors of your Lord will you deny?" },
      { startTime: 183, endTime: 206, text: "What do you say, Qi Card owner? Will you also, like the others, say it's targeting and political character assassination? By God, if targeting and political character assassination are against the corrupt and for the sake of public money, protecting public money, and maintaining the prestige of the state, then welcome to character assassination." },
      { startTime: 206, endTime: 225, text: "Because the corrupt person must fall and be stepped on his head, not just fall. And then, what is character assassination? Is there any honorable person who robs the state? Robs the state's money and the people's money? Only a lowlife extends his hand to the state's money and the people's money." },
      { startTime: 225, endTime: 237, text: "Therefore, I call you the corrupt lowlifes, corrupt lowlifes, may God not be pleased with you, nor are you legitimate sons. What is this, they brought you and made you general managers and gave you companies? What suits you and your real place is to be in prison." },
    ]
  },
  {
    id: "q10",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q10.mp4",
    title: "Who is Bahaa Abdul Hussein?",
    description: "Analysis of court documents and the critical question: who are Bahaa's partners?",
    transcript: [
      { startTime: 0, endTime: 4, text: "Bahaa Abdul Hussein, the owner of Qi Card." },
      { startTime: 4, endTime: 5, text: "Okay?" },
      { startTime: 5, endTime: 15, text: "He reportedly made statements and so on and so forth." },
      { startTime: 15, endTime: 38, text: "Anyway, an order was issued, and this document from the Diwani Order Committee states that Ahmed Abdul Jalil and Bahaa Abdul Hussein were not subjected to torture or anything else, and this is the court's decision itself." },
      { startTime: 38, endTime: 39, text: "Okay?" },
      { startTime: 39, endTime: 57, text: "Well, if there are no signs of torture and this is a medical report from the government, how can someone like Bahaa Abdul Hussein, the owner of Qi Card, prove that he was subjected to torture?" },
      { startTime: 57, endTime: 63, text: "Well, do people know who the owner of Qi Card is?" },
      { startTime: 63, endTime: 67, text: "Who is he? I mean, who is Bahaa Abdul Hussein?" },
      { startTime: 67, endTime: 72, text: "My issue now is not whether he was tortured or not." },
      { startTime: 72, endTime: 73, text: "Okay?" },
      { startTime: 73, endTime: 80, text: "We have people being forced to sit... the other day someone in Basra said the police chief told a tribal sheikh, 'I'll make you sit on a bottle'." },
      { startTime: 80, endTime: 85, text: "I mean, it's normal if they hit you with a hose a few times." },
      { startTime: 85, endTime: 91, text: "No, no, why go to Solagh? Didn't they used to call him 'Solagh Drill'?" },
      { startTime: 91, endTime: 95, text: "What's happening in the secret prisons?" },
      { startTime: 95, endTime: 99, text: "Anyway, my issue is not torture now, whether he was tortured or not." },
      { startTime: 99, endTime: 103, text: "My issue is the very important question:" },
      { startTime: 103, endTime: 108, text: "Who is Bahaa Abdul Hussein, the owner of Qi Card?" },
      { startTime: 108, endTime: 113, text: "And who is with him? And who are his associates? And who are his partners?" },
      { startTime: 113, endTime: 116, text: "I have the answer." },
    ]
  },
  {
    id: "q11",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q11.mp4",
    title: "Fear of Speaking Out",
    description: "Citizen wants to speak but stops himself, fearing prison for what he knows",
    transcript: [
      { startTime: 0, endTime: 1.5, text: "There's a word I want to say." },
      { startTime: 1.5, endTime: 2.5, text: "But it is said..." },
      { startTime: 4, endTime: 6.5, text: "No, it's hard. If I say this, I'll go to prison." },
      { startTime: 6.5, endTime: 7.5, text: "Let me stay quiet." },
      { startTime: 7.5, endTime: 9.5, text: "Believe me, mmm, I really want to say it." },
      { startTime: 9.5, endTime: 11.5, text: "I really want to say it." },
    ]
  },
  {
    id: "q12",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q12.mp4",
    title: "Company Censorship & 1.5 Star Rating",
    description: "User calls out mass censorship of warning posts, notes app has 1.5 star rating",
    transcript: [
      { startTime: 0, endTime: 4, text: "The question that puzzles me is, why do you want people to lose their money?" },
      { startTime: 4, endTime: 10, text: "You've all seen this post, and its content was: if you have a card, cover its information so your money doesn't go away." },
      { startTime: 10, endTime: 15, text: "From the number of shares, it's clear how many people didn't know this information." },
      { startTime: 15, endTime: 21, text: "The post has nothing to do with the company that calls itself 'global,' neither directly nor indirectly." },
      { startTime: 21, endTime: 27, text: "So on what basis do you come and delete the post? This is besides the two previous videos you deleted." },
      { startTime: 27, endTime: 33, text: "Any influencer or channel that talks about a topic that this 'global' company doesn't like, they delete it." },
      { startTime: 33, endTime: 39, text: "In addition to your failure to help people whose money is lost, you prevent anyone from warning people so their money isn't lost." },
      { startTime: 39, endTime: 44, text: "Even though people have started to know and act correctly, for example, your app currently..." },
      { startTime: 44, endTime: 48, text: "...has a rating of 1.5 stars. This is proof that people are fed up with you." },
      { startTime: 48, endTime: 53, text: "And I am one of the people who go to the app, rate it one star, and write a comment:" },
      { startTime: 53, endTime: 58, text: "'Stop the policy of silencing people and improve your services.' I'm sure you'll see this comment a lot in the coming period." },
      { startTime: 58, endTime: 63, text: "I'm currently traveling and I have this card, and it's not your card, and it's safer than your card." },
      { startTime: 63, endTime: 68, text: "But unfortunately, you were imposed on us." },
    ]
  },
  {
    id: "q13",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q13.mp4",
    title: "Merchant: Theft From Within",
    description: "Merchant with secure card accuses company of inside job: 'theft is happening from within'",
    transcript: [
      { startTime: 0, endTime: 9, text: "Rejected transaction of $10, rejected transaction of $2, $2, $10, $2, all these transactions I didn't even do." },
      { startTime: 9, endTime: 19, text: "The whole world is moving to electronic payments in government departments, and you comfortably receive your salary of 500k or 600k, then wake up the next day to find it's 20k or 10k dinars." },
      { startTime: 19, endTime: 30, text: "You just see someone sitting and draining your money, $9, $10, such an amount withdrawn, such an amount withdrawn, besides amounts that are withdrawn and taken from you without appearing in my notifications." },
      { startTime: 30, endTime: 40, text: "Meaning when you go to notifications to know where this money went, there's no notification at all, so where did the money fly to?" },
      { startTime: 40, endTime: 47, text: "When you go to complain to them, talk to them, 'Hey, where's my money?', they tell you 'There's no notification on our end, we don't know, your card is hacked.'" },
      { startTime: 47, endTime: 58, text: "An Iraqi central bank, considered the main one for us, and everyone depends on it, from merchants to employees to ordinary people, for deposits, withdrawals, self-withdrawal of funds, depositing, sending money." },
      { startTime: 58, endTime: 75, text: "And hacks happen, and not just to one or two people, almost over 50% of Qi Card holders have massive amounts of money withdrawn, very large sums." },
      { startTime: 75, endTime: 88, text: "And I noticed something, they send money to your wallet, for example, a million, then withdraw 999k back. Why? It means the matter is a complete drain, like soap scrubbing everything away." },
      { startTime: 88, endTime: 97, text: "And when you contact technical support, they'll tell you 'My dear, you're hacked.' Well, how am I hacked? 'Well, maybe your card was at a gas station, I don't know, or you gave it to an outlet.'" },
      { startTime: 97, endTime: 113, text: "I'm one of those people who has a merchant card, I haven't given it to any human, nor taken it to a gas station, nor given it to an outlet, nor has anyone seen it, even I haven't seen it, yet withdrawals and electronic card purchases from an unknown source happened on it." },
      { startTime: 113, endTime: 124, text: "I'm not afraid and I don't rule it out, and I say it loudly: this theft is happening from within the company, they are stealing people's cards." },
      { startTime: 124, endTime: 128, text: "Meaning, in brackets, you are 'five next to six' [dishonest]." },
      { startTime: 128, endTime: 138, text: "Meaning if you take this card, consider that if you were at zero, you'll go below zero. Greetings to you, this was 'Saffah Al-As'ar' [Price Slayer]." },
    ]
  },
  {
    id: "q14",
    videoUrl: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/Q14.mp4",
    title: "Woman's Breakdown: 520k Gone in Seconds",
    description: "Woman breaks down crying as 520,000 IQD is drained in real-time—left with 1,000 dinars",
    transcript: [
      { startTime: 0, endTime: 6, text: "This is my state and my situation, I've been crying, broken down, and agitated for almost half an hour." },
      { startTime: 6, endTime: 11, text: "400,000 [Iraqi Dinars] were deposited into my account, work of course, a whole month of hard work and exhaustion." },
      { startTime: 11, endTime: 19, text: "Your blood is gone, your dignity is gone for 400,000 for a whole month, deposited into your Master [card]." },
      { startTime: 19, endTime: 25, text: "Rafidain Master [card], they withdraw it through an app I don't even know." },
      { startTime: 25, endTime: 30, text: "Why? 'Oh, you're hacked,' and she says it so boldly and calmly to me." },
      { startTime: 30, endTime: 38, text: "Tell me where the company is, this isn't the first time you've done this to me, every day you subscribe me to something, every day you withdraw something from me." },
      { startTime: 38, endTime: 46, text: "She tells me 'I won't tell you where the company is, go and write that your Master [card] is hacked and close it yourself.'" },
      { startTime: 46, endTime: 54, text: "Imagine, 520,000 is deducted from me just like that in seconds, I swear in seconds." },
      { startTime: 54, endTime: 60, text: "120, 130, 140, 150, 160 [thousand] until it jumped, only 1,000 dinars remained." },
      { startTime: 60, endTime: 68, text: "1,000 dinars remained, from 520,000 to 1,000 dinars left in my account, and I earned them with hard work." },
      { startTime: 68, endTime: 76, text: "I didn't leave any job unworked just to save them, and I have commitments and work." },
      { startTime: 76, endTime: 81, text: "And now I'm in the street like a crazy person, sitting and crying, here in front of you." },
      { startTime: 81, endTime: 86, text: "'Purchase made for 1,000 dinars,' even this 1,000 they deducted from me, they don't fear God." },
      { startTime: 86, endTime: 93, text: "They are deducting from my account, 'it's hacked, hacked,' just like that, so simply, in seconds, in seconds." },
      { startTime: 93, endTime: 100, text: "What is my fault? What is my fault that my situation is like this in the street now? Explain to me why, what is my fault?" },
      { startTime: 100, endTime: 106, text: "I mean, a card..." },
    ]
  },
];

const VideoCard: React.FC<{ video: TestimonialVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");

  useEffect(() => {
    const segment = video.transcript.find(
      (seg) => currentTime >= seg.startTime && currentTime < seg.endTime
    );
    setCurrentTranscript(segment?.text || "");
  }, [currentTime, video.transcript]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      {/* Video Player */}
      <div className="relative bg-black aspect-video group cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
          playsInline
          muted={isMuted}
          src={video.videoUrl}
        />
        
        {/* Play Overlay */}
        <div 
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        >
          <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg transform transition-transform hover:scale-110">
            {isPlaying ? <Pause size={20} className="text-slate-900" /> : <Play size={20} className="text-slate-900 ml-0.5" />}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white text-[10px]">
            <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
            <button onClick={toggleMute} className="hover:text-sky-200 p-1">
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div 
            className="h-full bg-sky-500 transition-all duration-100"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Title & Description */}
      <div className="px-3 py-2 border-b border-slate-100">
        <h4 className="text-sm font-semibold text-slate-900">{video.title}</h4>
        {video.description && (
          <p className="text-xs text-slate-600 mt-0.5">{video.description}</p>
        )}
      </div>

      {/* Live Transcript */}
      <div className="px-3 py-3 bg-slate-50 min-h-[80px] flex items-center">
        {currentTranscript ? (
          <div className="flex gap-2 items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <p className="text-sm text-slate-800 leading-relaxed italic">
              "{currentTranscript}"
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            {isPlaying ? "..." : "Press play to view live transcript"}
          </p>
        )}
      </div>
    </div>
  );
};

const InvestigativeReportsGrid: React.FC = () => {
  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-slate-200" />
          <h2 className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">
            Live Investigative Reports
          </h2>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-xs sm:text-sm text-slate-700 text-center max-w-2xl mx-auto">
          Citizen testimonials documenting Qi Card grievances. Videos feature Arabic audio with live English transcription synchronized to playback.
        </p>
      </div>

      {/* Video Grid - 2x2 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonialVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-[10px] text-slate-500">
          All videos sourced from public social media platforms. Translations provided for documentation purposes.
        </p>
      </div>
    </div>
  );
};

export default InvestigativeReportsGrid;

