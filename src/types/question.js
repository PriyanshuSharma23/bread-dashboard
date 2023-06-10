export class SliderQuestion {
  constructor({
    text = "",
    aiEnhance = false,
    required = true,
    minRange,
    maxRange,
    key = "",
    id,
    next,
  }) {
    this.text = text;
    this.aiEnhance = aiEnhance;
    this.required = required;
    this.minRange = minRange;
    this.maxRange = maxRange;
    this.key = key;
    this.id = id ?? Math.random().toString(36).substr(2, 9);
    this.type = "slider";
    this.next = next;
  }

  checkValid() {
    if (this.text === undefined || this.text === "") {
      throw new Error("text is undefined in " + this.id);
    }

    if (this.minRange === undefined || this.maxRange === undefined) {
      throw new Error("minRange or maxRange is undefined in " + this.id);
    }

    if (this.minRange > this.maxRange) {
      throw new Error("minRange is greater than maxRange " + this.id);
    }

    if (this.key === undefined || this.key === "") {
      throw new Error("key is undefined in " + this.id);
    }

    return true;
  }

  getObj() {
    return {
      text: this.text,
      aiEnhance: this.aiEnhance,
      required: this.required,
      minRange: this.minRange,
      maxRange: this.maxRange,
      key: this.key,
      id: this.id,
    };
  }

  static getIcon() {
    return (
      <svg
        width="18"
        height="6"
        viewBox="0 0 18 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3H1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 3L17 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 3C7 1.89543 6.1046 1 5 1C3.8954 1 3 1.89543 3 3C3 4.10457 3.8954 5 5 5C6.1046 5 7 4.10457 7 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
}

export class OptionQuestion {
  constructor({
    text = "",
    options = [],
    aiEnhance = false,
    required = true,
    multipleCorrect = false,
    key = "",
    id,
    next,
  }) {
    this.text = text;
    this.options = options;
    this.aiEnhance = aiEnhance;
    this.required = required;
    this.multipleCorrect = multipleCorrect;
    this.key = key;
    this.id = id ?? Math.random().toString(36).substr(2, 9);
    this.type = "option";
    this.next = next;
  }

  checkValid() {
    if (this.text === undefined || this.text === "") {
      throw new Error("text is undefined in " + this.id);
    }

    if (this.options === undefined || this.options.length === 0) {
      throw new Error("options is undefined in " + this.id);
    }

    if (this.key === undefined || this.key === "") {
      throw new Error("key is undefined in " + this.id);
    }

    return true;
  }

  getObj() {
    return {
      text: this.text,
      options: this.options,
      aiEnhance: this.aiEnhance,
      required: this.required,
      multipleCorrect: this.multipleCorrect,
      key: this.key,
      id: this.id,
    };
  }

  static getIcon(props) {
    return (
      <svg
        width={30}
        height={30}
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M15 15H35.625"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 22.5H35.625"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 30H35.625"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.375 15V15.0187"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.375 22.5V22.5188"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.375 30V30.0188"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class TextQuestion {
  constructor({
    text = "",
    aiEnhance = false,
    required = true,
    key = "",
    id,
    next,
  }) {
    this.text = text;
    this.aiEnhance = aiEnhance;
    this.required = required;
    this.key = key;
    this.id = id ?? Math.random().toString(36).substr(2, 9);
    this.type = "text";
    this.next = next;
  }

  getObj() {
    return {
      text: this.text,
      aiEnhance: this.aiEnhance,
      required: this.required,
      key: this.key,
      id: this.id,
    };
  }

  checkValid() {
    if (this.text === undefined || this.text === "") {
      throw new Error("text is undefined in " + this.id);
    }

    if (this.key === undefined || this.key === "") {
      throw new Error("key is undefined in " + this.id);
    }

    return true;
  }

  static getIcon(props) {
    return (
      <svg
        width={25}
        height={(40 / 34) * 25}
        viewBox="0 0 34 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M28.3337 6.6665H5.66699V33.3332H28.3337V6.6665Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.91699 13.333H24.0837"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.91699 20H24.0837"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.91699 26.6665H18.417"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export class BranchQuestion {
  constructor({ text = "", options = [], aiEnhance = false, key = "", id }) {
    this.text = text;
    this.key = key;
    this.options = options;
    this.aiEnhance = aiEnhance;
    this.required = true;
    this.multipleCorrect = false;
    this.id = id ?? Math.random().toString(36).substr(2, 9);
    this.type = "branch";
  }

  getObj() {
    return {
      text: this.text,
      key: this.key,
      options: this.options,
      aiEnhance: this.aiEnhance,
      required: this.required,
      multipleCorrect: this.multipleCorrect,
      id: this.id,
    };
  }

  checkValid() {
    if (this.text === undefined || this.text === "") {
      throw new Error("text is undefined in " + this.id);
    }

    if (this.options === undefined || this.options.length === 0) {
      throw new Error("options is undefined in " + this.id);
    }

    if (this.key === undefined || this.key === "") {
      throw new Error("key is undefined in " + this.id);
    }

    return true;
  }

  // static fromJSON(json){

  // }

  static getIcon(props) {
    return (
      <svg
        width={32}
        height={(29 / 38) * 32}
        viewBox="0 0 38 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M8 14L25 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33.7284 22.7275L25.2432 14.2422"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.0002 24.0711L34.3642 23.364L35.0713 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33.7275 5.24323L25.2422 13.7285"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.3748 11.2532L33.6677 4.88924L27.3037 4.18213"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export function QuestionIconFromType(type, props) {
  switch (type) {
    case "option":
      return OptionQuestion.getIcon(props);
    case "text":
      return TextQuestion.getIcon(props);
    case "branch":
      return BranchQuestion.getIcon(props);
    case "slider":
      return SliderQuestion.getIcon(props);
    default:
      return null;
  }
}

export function QuestionFromType(type, data) {
  switch (type) {
    case "option":
      return new OptionQuestion({
        text: data.text,
        aiEnhance: data.aiEnhance,
        required: data.required,
        multipleCorrect: data.multipleCorrect,
        key: data.key,
        id: data.id,
      });
    case "text":
      return new TextQuestion({
        text: data.text,
        aiEnhance: data.aiEnhance,
        required: data.required,
        key: data.key,
        id: data.id,
      });
    case "branch":
      return new BranchQuestion({
        text: data.text,
        aiEnhance: data.aiEnhance,
        key: data.key,
        id: data.id,
      });
    case "slider":
      return new SliderQuestion({
        text: data.text,
        aiEnhance: data.aiEnhance,
        required: data.required,
        minRange: data.minRange,
        maxRange: data.maxRange,
        key: data.key,
        id: data.id,
      });
    default:
      return null;
  }
}

export const allQuestionTypes = ["text", "option", "branch", "slider"];

export function getIconFromInstance(question) {
  switch (question.constructor) {
    case OptionQuestion:
      return OptionQuestion.getIcon();
    case TextQuestion:
      return TextQuestion.getIcon();
    case BranchQuestion:
      return BranchQuestion.getIcon();
    case SliderQuestion:
      return SliderQuestion.getIcon();
    default:
      return null;
  }
}
