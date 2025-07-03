
      const imgIconActions = document.getElementById("imgIconActions")
      const nameInput = document.getElementById('nameValue');
      const nameResult = document.getElementById("nameResult");
      const ageResult = document.getElementById("ageResult");
      const imgIconResultF = document.getElementById('imgIconResultF')
      const imgIconResultM = document.getElementById('imgIconResultM')
      
      let timer = null;

      nameInput.addEventListener("input", () => {
        clearTimeout(timer);
        loadingFesults();

        timer = setTimeout(() => {
          const nameWithoutSpace = nameInput.value.trim();
          if (nameWithoutSpace == "") {
            clearResult();
            return;
          }
          getAgeByName(nameWithoutSpace);
        }, 1000);
      });

      async function getAgeByName(username) {

        try {
          const parameters = new URLSearchParams({
            name: username
          })
          const uri = 'https://api.agify.io?'
          const apiResponse = await fetch( uri + parameters.toString());
          
          if (!apiResponse.ok) {
            throw new Error(`Erro na resposta: ${apiResponse.status}`);
          }

          const data = await apiResponse.json();
          showResult(data);
        } catch (erro) {
          console.error("erro ao chamar a Api", erro);
          erro();
        }
      }
      function clearResult() {
        nameResult.innerText = "";
        ageResult.innerText = "";
        imgIconActions.src = "images/icons/mulher.png";
        imgIconResultF.src = "";
        imgIconResultM.src = "";
      }
      function loadingFesults() {
        nameResult.innerText = "Procurando...";
        ageResult.innerText = "";
        imgIconActions.src = "images/icons/carregando.webp";
        imgIconResultF.src = "";
        imgIconResultM.src = "";
      }
      function showResult(result) {
        nameResult.innerText = `Nome: ${result.name}`;
        ageResult.innerText = `Idade: ${result.age ?? "Desconhecida"} `;

        if (result.age > 50) {
          imgIconResultF.src = "images/icons/old-woman.png";
          imgIconResultM.src = "images/icons/old-man.png";
           imgIconActions.src = "";
        } else if (result.age >= 19 && result.age <= 50) {
          imgIconResultF.src = "images/icons/adult-woman.png";
          imgIconResultM.src = "images/icons/adult-man.png";
          imgIconActions.src = "";
        } else if (result.age >= 5 && result.age <= 18) {
          imgIconResultF.src = "images/icons/girl.png";
          imgIconResultM.src = "images/icons/boy.png";
          imgIconActions.src = "";
        } else if (result.age >= 0 && result.age < 5) {
          imgIconResultF.src = "images/icons/baby.png";
          imgIconResultM.src = "";
          imgIconActions.src = "";
        } else {
         imgIconActions.src = "images/icons/erro.png";
        }
      }
      function erro() {
        nameResult.innerText = "ocorreu um erro";
        ageResult.innerText = "";
        imgIconActions.src = "";
        imgIconResultF.src = "";
        imgIconResultM.src = "";
      }