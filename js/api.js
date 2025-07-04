const input = document.getElementById("userName");
const apiLoading = document.querySelector(".api-loading");
const apiResponses = document.querySelector(".api-responses");
const apiError = document.querySelector(".api-error");
const invalidUserInputError = document.querySelector(
  ".invalid-user-input-error"
);
const animatedActions = document.querySelector(".animated-action");

const startingImageSrc = "/images/starting.png";
const loadingImageSrc = "/images/typing.webp";
const erroImageSrc = "/images/error.png";
const invalidImageSrc = "/images/invalid.png";
const successImageSrc = "/images/success.png";

const apiResponseName = document.querySelector(".api-response-name");
const apiResponseAge = document.querySelector(".api-response-age");
const apiResponseCount = document.querySelector(".api-response-count");

let debounce = null;
let isLoading = false;

input.addEventListener("input", () => {
  isLoading = true;
  if (isLoading === true) {
    invalidUserInputError.style.display = "none";
    apiResponses.style.display = "none";
    apiError.style.display = "none";
    invalidUserInputError.style.display = "none";
    apiLoading.style.display = "flex";
    animatedActions.setAttribute("src", loadingImageSrc);
    animatedActions.setAttribute("alt", "Carregando");
  }

  clearTimeout(debounce);
  debounce = setTimeout(() => {
    let userName = input.value.trim();
    if (userName === "") {
      console.log("Nome vazio");
      input.value = "";
      apiLoading.style.display = "none";
      invalidUserInputError.style.display = "flex";
      animatedActions.setAttribute("src", invalidImageSrc);
      input.onblur = () => { 
      animatedActions.setAttribute("src", startingImageSrc )
      invalidUserInputError.style.display = "none";
 };
    } else {
      getApiData(userName);
      input.onblur = null;
    }
  }, 1000);
});




function showResults(data) {
  apiResponseName.textContent = data.name;
  apiResponseAge.textContent = data.age ?? "Desconhecida";
  apiResponseCount.textContent = data.count + " registros";
  isLoading = false;
  if (isLoading === false) {
    apiResponses.style.display = "flex";
    apiLoading.style.display = "none";
    apiError.style.display = "none";
    animatedActions.setAttribute("src", successImageSrc);
  }
}

async function getApiData(name) {
  try {
    const parameters = new URLSearchParams({
      name: name,
    });
    const url = "https://api.agify.io?";
    const response = await fetch(url + parameters.toString());

    if (!response.ok) {
      throw new Error(`Erro na resposta: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    showResults(data);
  } catch (error) {
    console.log("Erro ao buscar dados da API: " + error);
    apiError.style.display = "flex";
    apiLoading.style.display = "none";
    apiResponses.style.display = "none";
    animatedActions.setAttribute("src", erroImageSrc);
  }
}
