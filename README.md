# Catálogo Interativo Mobile com Listagem de Produtos por Categoria

Projeto acadêmico desenvolvido com Expo, React Native, Axios e Redux Toolkit.

## Funcionalidades
- Login com validação de campo
- Armazenamento temporário do usuário com Redux Toolkit
- Abas de categorias: Masculino e Feminino
- Consumo de API REST da DummyJSON com Axios
- Tela de detalhes do produto
- Logout funcional
- Tratamento de loading e erro

## Categorias usadas
### Masculino
- mens-shirts
- mens-shoes
- mens-watches

### Feminino
- womens-bags
- womens-dresses
- womens-jewellery
- womens-shoes
- womens-watches

## Como executar
```bash
npm install
npx expo start
```

## Estrutura
```text
src/
  components/
  constants/
  screens/
  services/
  store/
```

## API
- Listagem por categoria: https://dummyjson.com/products/category/{categoria}
- Detalhes por ID: https://dummyjson.com/products/{id}
