'use client';

import React, { ReactNode } from 'react';
import { m } from 'framer-motion';
import {
  FaShieldAlt,
  FaCopyright,
  FaExclamationTriangle,
  FaTools,
  FaUserShield,
  FaLink,
  FaBalanceScale,
  FaHistory,
  FaEnvelope,
  FaFileAlt,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';

// Define types for our components
type AnimatedItemProps = {
  icon: ReactNode;
  text: string;
  color: string;
  index: number;
};

type SectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  index: number;
};

const Disclaimer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  // Copyright infringement items
  const copyrightItems = [
    '您或您代表的版权所有者的身份证明',
    '被侵权作品的明确描述和位置（URL链接）',
    '您对该内容拥有版权的证据',
    '您的联系信息，包括电子邮件地址和电话号码',
    '声明您有理由相信未经授权使用您的受版权保护作品',
    '声明您提供的信息准确无误，并且您是版权所有者或被授权代表版权所有者',
  ];

  // Infringement handling items
  const infringementHandlingItems = [
    '移除或禁用访问被投诉的内容',
    '通知上传该内容的用户',
    '采取适当措施防止此类内容在未来重新上传',
  ];

  // Function to create an animated item with icon
  const AnimatedItem = ({ icon, text, color, index }: AnimatedItemProps) => (
    <m.div
      className={`mb-3 flex items-center space-x-3 rounded-lg bg-gradient-to-r p-3 ${color} transform bg-opacity-5 transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-10`}
      variants={itemVariants}
      custom={index}
    >
      <div className={`rounded-full p-2 ${color} flex-shrink-0 text-white`}>{icon}</div>
      <p className="text-dark-text-primary">{text}</p>
    </m.div>
  );

  // Function to create a section with title and content
  const Section = ({ icon, title, children, index }: SectionProps) => {
    const gradientColors = [
      'from-blue-500 to-indigo-600',
      'from-green-500 to-teal-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-indigo-500 to-blue-600',
      'from-pink-500 to-purple-600',
      'from-teal-500 to-cyan-600',
      'from-amber-500 to-yellow-600',
    ];

    const gradient = gradientColors[index % gradientColors.length];

    return (
      <m.section
        className="mb-10 overflow-hidden rounded-xl border border-light-border bg-light-paper p-6 shadow-lg"
        variants={itemVariants}
      >
        <m.div className="mb-4 flex items-center" variants={titleVariants}>
          <div className={`mr-3 rounded-full bg-gradient-to-r p-2 ${gradient} text-white`}>{icon}</div>
          <h2 className="bg-gradient-to-r from-light-primary to-light-secondary bg-clip-text text-2xl font-bold text-transparent dark:from-dark-primary dark:to-dark-secondary">
            {title}
          </h2>
        </m.div>
        <m.div variants={fadeInVariants}>{children}</m.div>
      </m.section>
    );
  };

  return (
    <m.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={containerVariants}>
      <m.h1
        className="mb-10 bg-gradient-to-r from-light-primary to-light-secondary bg-clip-text text-center text-4xl font-bold text-transparent dark:from-dark-primary dark:to-dark-secondary"
        variants={titleVariants}
      >
        免责声明
      </m.h1>

      <m.div
        className="mb-10 text-center text-light-text-secondary dark:text-dark-text-secondary"
        variants={fadeInVariants}
      >
        <p>最后更新日期：{new Date().toISOString().split('T')[0]}</p>
      </m.div>

      <div className="mx-auto grid max-w-5xl gap-8">
        <Section icon={<FaFileAlt size={24} />} title="内容来源声明" index={0}>
          <p className="leading-relaxed">
            请注意，最爱小说网（"本网站"）上的小说、漫画及其他文学作品主要由用户上传和分享。我们作为信息存储平台，不对这些内容拥有所有权，也不主张对这些内容拥有任何权利。
          </p>
          <m.p className="mt-4 leading-relaxed" variants={fadeInVariants}>
            本网站尊重知识产权，并致力于保护权利持有人的合法权益。我们相信用户上传的内容已获得适当授权或属于公共领域，但我们无法对所有上传内容进行全面审核。
          </m.p>
        </Section>

        <Section icon={<FaCopyright size={24} />} title="版权问题处理" index={1}>
          <p className="mb-4 leading-relaxed">
            如果您是版权所有者，发现本网站上有侵犯您知识产权的内容，请立即联系我们并提供以下信息：
          </p>

          <div className="mb-6 space-y-2">
            {copyrightItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaInfoCircle size={18} />}
                text={item}
                color="from-blue-500 to-indigo-600"
                index={idx}
              />
            ))}
          </div>

          <p className="mb-4 leading-relaxed">收到合格的侵权投诉后，我们将尽快：</p>

          <div className="space-y-2">
            {infringementHandlingItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaExclamationCircle size={18} />}
                text={item}
                color="from-green-500 to-teal-600"
                index={idx}
              />
            ))}
          </div>

          <m.p className="mt-6 leading-relaxed" variants={fadeInVariants}>
            请将版权侵权通知发送至：
            <m.span
              className="ml-2 inline-block font-semibold text-light-primary dark:text-dark-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              copyright@zaixiaoshuo.com
            </m.span>
          </m.p>
        </Section>

        <Section icon={<FaShieldAlt size={24} />} title="内容质量与准确性" index={2}>
          <p className="leading-relaxed">
            尽管我们努力确保网站上的内容质量，但由于内容由用户提供，我们无法保证所有内容的准确性、完整性或质量。我们不对用户提供的内容承担责任，包括但不限于任何错误、遗漏或不准确之处。
          </p>
        </Section>

        <Section icon={<FaTools size={24} />} title="服务中断与技术问题" index={3}>
          <p className="leading-relaxed">
            我们致力于提供持续稳定的服务，但无法保证网站服务不会中断或完全无错误。由于技术问题、维护、更新或超出我们控制的因素，服务可能会暂时不可用或受到限制。
          </p>
        </Section>

        <Section icon={<FaUserShield size={24} />} title="用户风险承担" index={4}>
          <p className="leading-relaxed">
            您使用本网站及其内容的风险由您自行承担。我们不对使用或无法使用本网站而可能导致的任何损失或损害承担责任，包括但不限于直接、间接、附带、特殊、后果性或惩罚性损害。
          </p>
        </Section>

        <Section icon={<FaLink size={24} />} title="链接与第三方内容" index={5}>
          <p className="leading-relaxed">
            本网站可能包含指向第三方网站的链接或第三方提供的内容。这些链接和内容仅为用户方便而提供，不代表我们对这些网站或内容的认可或负责。您访问这些网站的风险由您自行承担。
          </p>
        </Section>

        <Section icon={<FaBalanceScale size={24} />} title="法律遵从" index={6}>
          <p className="leading-relaxed">
            本网站遵守中华人民共和国相关法律法规。我们保留在收到有关部门合法要求时，配合调查并提供必要信息的权利。
          </p>
        </Section>

        <Section icon={<FaHistory size={24} />} title="声明修改" index={7}>
          <p className="leading-relaxed">
            我们保留随时修改本免责声明的权利。修改后的声明将在本页面上发布，并自发布之日起生效。继续使用本网站表示您接受修改后的声明。
          </p>
        </Section>

        <Section icon={<FaEnvelope size={24} />} title="联系我们" index={8}>
          <p className="leading-relaxed">
            如您对本免责声明有任何疑问或建议，或需要报告侵权内容，请通过以下方式联系我们：
            <m.span
              className="ml-2 inline-block font-semibold text-light-primary dark:text-dark-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              disclaimer@zaixiaoshuo.com
            </m.span>
          </p>
        </Section>
      </div>
    </m.div>
  );
};

export default Disclaimer;
