import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

def realizar_login(driver):
    # Substitua 'seu_login' e 'sua_senha' pelos dados corretos de login e senha
    login = '123'
    senha = '123'

    driver.get("https://prodata.prodataweb.inf.br/ponto/app.html#/ponto/index")
    time.sleep(10)  # Aguardar carregar a página

    campo_login = driver.find_element("Matrícula")
    campo_senha = driver.find_element("Senha")
    campo_login.send_keys(login)
    campo_senha.send_keys(senha)
    campo_senha.send_keys(Keys.ENTER)

def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Executar em modo headless (sem abrir janela do navegador)
    driver = webdriver.Chrome(options=chrome_options)

    # Horários de registro de ponto
    horarios = ["08:00", "12:00", "13:30", "18:00"]

    # Obtém data e hora atual
    data_hora_atual = datetime.now()

    # Verifica se é sexta-feira
    if data_hora_atual.weekday() == 4:
        # Adiciona o horário extra de sexta-feira (14:00)
        horarios.append("14:00")

    # Loop para registrar ponto nos horários especificados
    for horario in horarios:
        hora = datetime.strptime(horario, "%H:%M").time()
        while True:
            data_hora_atual = datetime.now().time()
            if data_hora_atual >= hora:
                print(f"Registrando ponto às {horario}")
                realizar_login(driver)
                time.sleep(1)  # Aguarda 1 segundo para evitar múltiplos registros
                break

    driver.quit()

if __name__ == "__main__":
    main()