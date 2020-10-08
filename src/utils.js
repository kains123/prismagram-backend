import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
//sendgird//import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
import mgTransport from "nodemailer-mailgun-transport";

//mailgun//
// const nodemailer = require('nodemailer');
// const mg = require('nodemailer-mailgun-transport');
//mailgun//
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};


const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    }
  };
  //mailgun
  const client = nodemailer.createTransport(mgTransport(options));
  //mailgun
  //sendgrid// const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "nico@prismagram.com",
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);