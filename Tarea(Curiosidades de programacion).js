/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
  javascript: [
    "es un lenguaje usado principalmente para desarrollo web",
    "es un lenguaje dinámico",
    "está basado en prototipos",
  ],
    java:[
        "Java es un lenguaje de programación basado en clases y orientado a objetos, lo que significa que se basa en el concepto de objetos, clases y herencia.",
        "La compatibilidad de Java con el multithreading permite ejecutar simultáneamente varios hilos de ejecución en un mismo programa.",
        "Java cuenta con una rica API y vastas bibliotecas de código abierto que proporcionan a los desarrolladores una amplia gama de funcionalidades. ",
        ],
        
    python:[
        "Se trata de un lenguaje de código abierto.",
        "Se usa como lenguaje oficial de Google",
        "Se trata de un lenguaje interpretado.",
        "Python es un lenguaje de programación de propósito general, que es otra forma de decir que puede ser usado para casi todo",
        ],
        
    swift:[
      "Swift es un lenguaje de programación que tiene closures, punteros a funciones, tuplas que permiten devolver varios valores a la vez y tipos genéricos",
      "Swift, es que se trata de un lenguaje de programación de tipo seguro, porque verifica el tipo de las variables al compilar el código y marca cualquier tipo no coincidente como error.",
      "Es sencillo y rápido para iterar sobre colecciones, así como structs que soportan métodos, funciones y extensiones.",
      ],
      
    rust:[
         "Rust, es un lenguaje relativamente nuevo en el mercado del desarrollo de sistemas y ha destacado por ser ideal tanto para desarrolladores junior como para senior",
         "Rust permite desarrollar grandes programas del lado del cliente y del servidor mejorando la calidad del software",
         "Rust es muy parecida a la del lenguaje C++",
         ],
        
    pascal:[
        "Pascal es un Lenguaje de programación desarrollado por el profesor suizo Niklaus Wirth a finales de los años 60.",
        "El nombre que hoy lleva este lenguaje fue elegido en honor al filósofo y matemático francés, Blaise Pascal (1623-1662)",
        "Pascal fue diseñado como un lenguaje para la enseñanza; éste no era su único objetivo.",
        "Es un lenguaje de alto nivel, lo cual significa que su sintaxis es más parecida al lenguaje natural hablado que al lenguaje de máquina.",
        "Posee una colección de tipos de datos predefinidos; y además, también permite la definición de tipos de datos propios por parte del usuario programador.",
        "Es un lenguaje modular, ya que nos permite subdividir programas en bloques más pequeños (denominados módulos o subprogramas); donde cada bloque se puede programar de manera independiente.",
        ],
        
    ruby:[
        "Ruby es un lenguaje con un balance cuidado",
        "Ruby es simple en apariencia, pero complejo por dentro, como el cuerpo humano1.. ",
        "Su creador, Yukihiro “Matz” Matsumoto, mezcló partes de sus lenguajes favoritos (Perl, Smalltalk, Eiffel, Ada y Lisp) para formar un nuevo lenguaje que incorporara tanto la programación funcional como la imperativa.",
        ],
     
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, puedo darte datos curiosos de algun lenguaje de programación,solo tienes que mencionarlo, por ejemplo, prueba diciendo "JavaScript" "Java" "Python" "Ruby" "Swift" "Pascal" " Rust" ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CustomLanguageIntentHandle = {
    canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "CustomLanguageIntent"
    );
  },
  handle(handlerInput) {
    const {language} = handlerInput.requestEnvelope.request.intent.slots;
    let response;
    if (language && languageFacts[language.value]) {
      response =
        languageFacts[language.value][
          Math.floor(Math.random() * languageFacts[language.value].length)
        ];
    } else {
      response =
        "No tengo información sobre el lenguaje que has mencionado, prueba con otro";
    }
    const frasesCustomIntents = [
            "prueba ruby",
            "prueba java",
            "prueba JavaScript",
            "prueba python",
            "pueba Swift",
            "prueba Pascal",
            "prueba Rust",
        ];
        const examplePhrase = frasesCustomIntents[Math.floor(Math.random() * frasesCustomIntents.length)];
        const sugerencia = `has otra '${examplePhrase}'.`;
        const speakOutput = `${response}. ${sugerencia}`;
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(sugerencia)
            .getResponse();
  },
};
 
    

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `puedo darte datos curiosos de algún lenguaje de programación, 
        di algo como "prueba JavaScript"`;

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
        const speakOutput = "Que las buenas prácticas te acompañen y que tengas buen código!";

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
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
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
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CustomLanguageIntentHandle,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();