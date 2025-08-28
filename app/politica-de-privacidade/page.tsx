import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade",
  description: "Como coletamos, usamos e protegemos seus dados ao usar o site Tic Tic Pou. Política de privacidade completa e transparente.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/politica-de-privacidade',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-12">
      {/* Portuguese Version */}
      <section>
        <h1 className="text-4xl font-bold mb-6 text-primary">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-4">
          Atualizado em: 27/08/2025
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introdução</h2>
        <p className="text-muted-foreground mb-4">
          Bem-vindo ao site <strong className="text-foreground">Tic Tic Pou</strong>. Valorizamos a sua
          privacidade e estamos comprometidos em proteger seus dados pessoais. Esta Política de
          Privacidade descreve como coletamos, usamos, armazenamos e compartilhamos suas informações
          quando você utiliza nossos serviços.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Quais dados coletamos</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
          <li>
            Dados de cadastro: nome, endereço de e-mail e outros dados que você fornecer
            voluntariamente.
          </li>
          <li>
            Dados de uso: informações sobre como você navega e interage com o site, como páginas
            visitadas, cliques e duração da sessão.
          </li>
          <li>
            Cookies e tecnologias semelhantes: pequenos arquivos de texto armazenados em seu
            dispositivo para melhorar a experiência do usuário.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Como usamos os dados</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
          <li>Para fornecer e manter o funcionamento do site e de suas funcionalidades.</li>
          <li>Para entender e melhorar a experiência do usuário.</li>
          <li>Para comunicar atualizações, novidades e mensagens relacionadas ao jogo.</li>
          <li>Para garantir a segurança e prevenir fraudes.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Compartilhamento de dados</h2>
        <p className="text-muted-foreground mb-4">
          Não vendemos nem alugamos suas informações pessoais. Podemos compartilhar dados apenas com
          provedores de serviço de infraestrutura (por exemplo, hospedagem e análise de tráfego)
          estritamente para operar o site, sob contratos que garantem confidencialidade.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Seus direitos</h2>
        <p className="text-muted-foreground mb-4">
          Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Entre em contato por
          <Link href="mailto:me@markkop.dev" className="text-primary underline">e-mail</Link> para
          exercer esses direitos.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Alterações nesta política</h2>
        <p className="text-muted-foreground mb-4">
          Podemos atualizar esta política periodicamente. Publicaremos a versão revisada nesta página
          com a data de atualização.
        </p>
      </section>

      <hr className="border-muted-foreground/20" />

      {/* English Version */}
      <section>
        <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
        <p className="text-muted-foreground mb-4">Last updated: 2025-08-27</p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
        <p className="text-muted-foreground mb-4">
          Welcome to the <strong className="text-foreground">Tic Tic Pou</strong> website. We value your
          privacy and are committed to protecting your personal data. This Privacy Policy explains how
          we collect, use, store and share your information when you use our services.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information we collect</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
          <li>
            Registration data: name, e-mail address and any other details you voluntarily provide.
          </li>
          <li>
            Usage data: information about how you browse and interact with the site, such as pages
            visited, clicks and session duration.
          </li>
          <li>
            Cookies and similar technologies: small text files stored on your device to enhance user
            experience.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How we use the data</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
          <li>To provide and maintain the website and its features.</li>
          <li>To understand and improve user experience.</li>
          <li>To send updates, news and messages related to the game.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data sharing</h2>
        <p className="text-muted-foreground mb-4">
          We do not sell or rent your personal information. We may share data only with service
          providers (e.g., hosting and traffic analytics) strictly necessary to operate the website,
          under confidentiality agreements.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your rights</h2>
        <p className="text-muted-foreground mb-4">
          You have the right to access, correct or delete your personal data. Contact us via
          <Link href="mailto:me@markkop.dev" className="text-primary underline">e-mail</Link> to
          exercise these rights.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Changes to this policy</h2>
        <p className="text-muted-foreground mb-4">
          We may update this policy from time to time. We will post the revised version on this page
          with the update date.
        </p>
      </section>
    </div>
  );
}
