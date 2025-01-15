import acai300 from "../Assets/Img/produtos/acai300.jpg";
import acai500 from "../Assets/Img/produtos/acai500.jpg";
import acai700 from "../Assets/Img/produtos/acai700.jpg";
import picoleFruta from "../Assets/Img/produtos/picole-fruta.jpg";
import picoleTrufado from "../Assets/Img/produtos/picole-trufado.jpg";

const Produtos = [
  {
    tipo: "açai",
    nome: "Açaí 300ml",
    imagem: acai300,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 10.00
  },
  {
    tipo: "açai",
    nome: "Açaí 500ml",
    imagem: acai500,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 15.00
  },
  {
    tipo: "açai",
    nome: "Açaí 700ml",
    imagem: acai700,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 20.00
  },
  {
    tipo: "picole",
    nome: "Picolé de frutas",
    imagem: picoleFruta,
    descricao: "Picolé refrescante feito com uma mistura de frutas tropicais, ideal para os dias quentes.",
    preco: 5.00
  },
  {
    tipo: "picole",
    nome: "Picolé trufado",
    imagem: picoleTrufado,
    descricao: "Picolé trufado com recheio cremoso de chocolate, uma verdadeira delícia para os chocólatras.",
    preco: 7.00
  }
];

export default Produtos;