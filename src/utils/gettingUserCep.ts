export async function gettingUserCep(cep: number) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`)
    }

    const data = await response.json()

    const { localidade, bairro } = data

    return {
      city: localidade,
      neighborhood: bairro,
    }
  } catch (error) {
    console.error('Erro:', error)
  }
}
