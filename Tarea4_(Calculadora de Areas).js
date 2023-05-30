/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');



const languageStrings = {
  en: {
    translation: {
     WELCOME_MESSAGE:'Welcome to your area calculator, what operation do you want to perform?',
      HELP_MESSAGE:'can I help you do some kind of addition, subtraction, multiplication or division?',
      GOODBYE_MESSAGE:'May the good practices be with you, come back soon!!',
      FALLBACK_MESSAGE:'Sorry, I dont know anything about that. Please try again.',
      ERROR_MESSAGE:'Sorry, there was a problem. Please try again.',
      arearectangulo:'The rectangle area with the measures %s by %s is %s',
      areatriangulo:'The triangle area with the measures %s by %s is %s',
      areacriculo:'The area of the circle with radius %s is %s',
      SUGGESTIONRe:'Enter only positive numbers and greater than zero, try to say, What is the area of a rectangle with 6 length and 5 width',
      SUGGESTIONTRI:'Enter only positive numbers and greater than zero, try to say, calculate the area of the triangle with 7 of base and 5 of height',
      SUGGESTION:'Enter only positive numbers and greater than zero, try to say, calculate the area of the circle with radius 3'
      
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE:'Bienvenida a tu calculadora de areas , que operacion deseas realizar?',
      HELP_MESSAGE:'pued ayudarte a realizar algun tipo de suma, resta, multiplicacion o divicion?',
      GOODBYE_MESSAGE:'Que las buenas prácticas te acompañen, vuelve pronto!!',
      FALLBACK_MESSAGE:'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
      arearectangulo:'EL area del reactangulo con %s de largo y %s de ancho es %s',
      areatriangulo:'EL area del triangulo con  %s de base y %s de altura es %s',
      areacriculo:'EL area del circulo con radio %s es %s',
      SUGGESTIONRe:'Ingresa sólo numeros positivos y mayor a cero, prueba a decir, Cual es la area de un rectangulo con 6 de largo y  5 de ancho',
      SUGGESTIONTRI:'Ingresa sólo numeros positivos y mayor a cero, prueba a decir, calcula el area del triangulo con 7 de base y 5 de altura',
      SUGGESTION:'Ingresa sólo numeros positivos y mayor a cero, prueba a decir, calcula el area del circulo con radio de 3'
    }
  }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const Calcular_area_rectangulo = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Calcular_area_rectangulo';
    },
    handle(handlerInput) {
        
        const Largo = parseFloat(handlerInput.requestEnvelope.request.intent.slots.Largo.value);
        const ancho = parseFloat(handlerInput.requestEnvelope.request.intent.slots.ancho.value);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    
    if (Largo>= 1, ancho>=1){
        const resultado = Largo * ancho;
        const speakOutput = requestAttributes.t('arearectangulo',Largo,ancho,resultado);
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    } 
    else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('SUGGESTIONTRI');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};


const Calcular_area_triangulo = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Calcular_area_triangulo';
    },
    handle(handlerInput) {
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const base = parseFloat(handlerInput.requestEnvelope.request.intent.slots.base.value);
        const altura = parseFloat(handlerInput.requestEnvelope.request.intent.slots.altura.value);
    
    if (base>= 1 , altura>=1){
         const resultado = base * altura/2;
         const speakOutput = requestAttributes.t('areatriangulo',base,altura,resultado);
       

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
     else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('SUGGESTIONTRI');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};


const Calcular_area_circulo = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Calcular_area_circulo';
    },
    handle(handlerInput) {
        const radio = parseFloat(handlerInput.requestEnvelope.request.intent.slots.radio.value);

        if (radio>= 1){
            const valor = Math.PI * Math.pow(radio,2)
        
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('areacriculo',radio,valor);
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('SUGGESTION');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        Calcular_area_rectangulo,
        Calcular_area_triangulo,
        Calcular_area_circulo,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .lambda();