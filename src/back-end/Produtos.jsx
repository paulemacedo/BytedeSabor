import acai300 from "../Assets/Img/produtos/acai300.png";
import acai500 from "../Assets/Img/produtos/acai500.png";
import acai700 from "../Assets/Img/produtos/acai700.png";
import acai1000 from "../Assets/Img/produtos/acai1000.png";
import picoleBanana from "../Assets/Img/produtos/picole-banana.jpg";
import picoleChocolate from "../Assets/Img/produtos/picole-chocolate.jpg";
import picoleCoco from "../Assets/Img/produtos/picole-coco.jpg";
import picoleFramboesa from "../Assets/Img/produtos/picole-framboesa.jpg";
import picoleMorango from "../Assets/Img/produtos/picole-morango.jpg";
import picoleTrufado from "../Assets/Img/produtos/picole-trufado.jpg";

const Produtos = [
  {
    id: 100,
    tipo: "açai",
    nome: "Açaí de 300ml",
    imagem: acai300,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 10.00,
    status: "Em stock"
  },
  {
    id: 101,
    tipo: "açai",
    nome: "Açaí de 500ml",
    imagem: acai500,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 15.00,
    status: "Em stock"
  },
  {
    id: 102,
    tipo: "açai",
    nome: "Açaí de 700ml",
    imagem: acai700,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 20.00,
    status: "Em stock"
  },
  {
    id: 103,
    tipo: "picole",
    nome: "Picolé de banana",
    imagem: picoleBanana,
    descricao: "Picolé refrescante feito com banana, ideal para os dias quentes.",
    preco: 5.00,
    status: "Em stock"
  },
  {
    id: 104,
    tipo: "picole",
    nome: "Picolé de chocolate",
    imagem: picoleChocolate,
    descricao: "Picolé delicioso feito com chocolate, perfeito para os chocólatras.",
    preco: 6.00,
    status: "Em stock"
  },
  {
    id: 105,
    tipo: "picole",
    nome: "Picolé de coco",
    imagem: picoleCoco,
    descricao: "Picolé refrescante feito com coco, ideal para os dias quentes.",
    preco: 5.50,
    status: "Em stock"
  },
  {
    id: 106,
    tipo: "picole",
    nome: "Picolé de framboesa",
    imagem: picoleFramboesa,
    descricao: "Picolé refrescante feito com framboesa, ideal para os dias quentes.",
    preco: 6.00,
    status: "Em stock"
  },
  {
    id: 107,
    tipo: "picole",
    nome: "Picolé de morango",
    imagem: picoleMorango,
    descricao: "Picolé refrescante feito com morango, ideal para os dias quentes.",
    preco: 5.50,
    status: "Em stock"
  },
  {
    id: 108,
    tipo: "picole",
    nome: "Picolé trufado",
    imagem: picoleTrufado,
    descricao: "Picolé trufado com recheio cremoso de chocolate, uma verdadeira delícia para os chocólatras.",
    preco: 7.00,
    status: "Em stock"
  },
  {
    id: 109,
    tipo: "açai",
    nome: "Açaí de 1L",
    imagem: acai1000,
    descricao: "Delicioso açaí, perfeito para refrescar seu dia.",
    preco: 25.00,
    status: "Em stock"
  }
];

export default Produtos;