document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".item_projeto");
        const modal = document.getElementById("modalProjeto");
        const btnFechar = document.getElementById("fecharModal");

        // Elementos internos da modal que serão alterados
        const mImg = document.getElementById("modalImg");
        const mTitulo = document.getElementById("modalTitulo");
        const mDescricao = document.getElementById("modalDescricao");
        const mTecnologias = document.getElementById("modalTecnologias");
        const mDetalhes = document.getElementById("modalDetalhes");
        const mGit = document.getElementById("modalLinkGithub");
        const mDeploy = document.getElementById("modalLinkDeploy");

        // Abrir Modal ao clicar no card
        cards.forEach(card => {
            card.addEventListener("click", () => {
                // Captura a imagem do card clicado
                const imgSrc = card.querySelector("img").getAttribute("src");
                
                // Alimenta a modal com os dados do 'data-*' do HTML
                mImg.setAttribute("src", imgSrc);
                mTitulo.innerText = card.getAttribute("data-titulo");
                mDescricao.innerText = card.getAttribute("data-descricao");
                mTecnologias.innerText = card.getAttribute("data-tecnologias");
                mDetalhes.innerHTML = card.getAttribute("data-detalhes");

                // Configura link do GitHub
                const gitUrl = card.getAttribute("data-github");
                if(gitUrl && gitUrl !== "#") {
                    mGit.setAttribute("href", gitUrl);
                    mGit.style.display = "inline-flex";
                } else {
                    mGit.style.display = "none";
                }

                // Configura link de Deploy (Visualização real)
                const deployUrl = card.getAttribute("data-deploy");
                if(deployUrl && deployUrl !== "") {
                    mDeploy.setAttribute("href", deployUrl);
                    mDeploy.style.display = "inline-flex";
                } else {
                    mDeploy.style.display = "none";
                }

                // Ativa a animação de subida da modal
                modal.classList.add("ativa");
                document.body.style.overflow = "hidden"; // Trava o scroll da página ao fundo
            });
        });

        // Fechar Modal no botão 'X'
        btnFechar.addEventListener("click", fecharJanelaModal);

        // Fechar Modal ao clicar fora dela (no fundo borrado)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharJanelaModal();
            }
        });

        // Fechar Modal pressionando a tecla 'ESC'
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("ativa")) {
                fecharJanelaModal();
            }
        });

        function fecharJanelaModal() {
            modal.classList.remove("ativa");
            document.body.style.overflow = "auto"; // Libera o scroll novamente
        }
    });