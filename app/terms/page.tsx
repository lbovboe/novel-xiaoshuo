'use client';

import React, { ReactNode } from 'react';
import { m } from 'framer-motion';
import {
  FaHandshake,
  FaUserCircle,
  FaCopyright,
  FaLink,
  FaCogs,
  FaExclamationTriangle,
  FaBalanceScale,
  FaHistory,
  FaEnvelope,
  FaGavel,
  FaUserCheck,
  FaGlobe,
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

const TermsOfService = () => {
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

  // Terms of use items
  const termsOfUseItems = [
    '遵守所有适用的法律和法规',
    '不侵犯他人的权利',
    '不以任何方式干扰网站的正常运行',
    '不使用自动化工具过度访问或抓取网站内容',
    '对您在网站上的所有活动负责',
  ];

  // User generated content items
  const userContentItems = [
    '违法、欺诈、威胁、诽谤、淫秽或侵犯隐私的内容',
    '侵犯他人知识产权的内容',
    '包含恶意软件、病毒或有害代码的内容',
    '商业推广、连锁信或未经请求的批量信息',
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
        服务条款
      </m.h1>

      <m.div
        className="mb-10 text-center text-light-text-secondary dark:text-dark-text-secondary"
        variants={fadeInVariants}
      >
        <p>最后更新日期：{new Date().toISOString().split('T')[0]}</p>
      </m.div>

      <div className="mx-auto grid max-w-5xl gap-8">
        <Section icon={<FaHandshake size={24} />} title="欢迎使用最爱小说网" index={0}>
          <p className="leading-relaxed">
            欢迎访问最爱小说网（&quot;本网站&quot;，&quot;我们&quot;或&quot;我们的&quot;）。本网站由最爱小说网运营。通过访问和使用本网站，您同意受以下条款和条件的约束。如果您不同意这些条款，请不要使用本网站。
          </p>
        </Section>

        <Section icon={<FaGavel size={24} />} title="使用条款" index={1}>
          <p className="mb-4">使用本网站时，您同意：</p>
          <div className="space-y-2">
            {termsOfUseItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaUserCheck size={18} />}
                text={item}
                color="from-blue-500 to-indigo-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaUserCircle size={24} />} title="用户账户" index={2}>
          <p className="leading-relaxed">
            某些功能或内容可能需要注册账户。如果您创建账户，您需要提供准确、完整且最新的信息。您有责任保护您的账户密码，并对在您的账户下发生的所有活动负责。
          </p>
        </Section>

        <Section icon={<FaCopyright size={24} />} title="内容和知识产权" index={3}>
          <p className="leading-relaxed">
            本网站上的内容，包括但不限于文本、图像、图形、标志、图标、音视频剪辑、数据编译和软件，均为本网站或其内容提供者的财产，受著作权、商标和其他法律保护。
          </p>
          <m.p className="mt-4 leading-relaxed" variants={fadeInVariants}>
            您可以仅为个人、非商业用途浏览和阅读内容。未经明确许可，您不得复制、修改、分发、展示、表演、转载、出版、创建衍生作品、传输或以其他方式使用任何内容。
          </m.p>
        </Section>

        <Section icon={<FaGlobe size={24} />} title="用户生成内容" index={4}>
          <p className="leading-relaxed">
            您可能有机会在本网站上发布评论、反馈或其他内容。提交内容时，您授予我们非独占、免版税、永久、可转让和全球性的许可，用于使用、复制、修改、改编、出版、翻译、创建衍生作品、分发和展示该内容。
          </p>
          <p className="mb-4 mt-4">您同意不提交以下内容：</p>
          <div className="space-y-2">
            {userContentItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaExclamationTriangle size={18} />}
                text={item}
                color="from-orange-500 to-red-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaLink size={24} />} title="第三方链接" index={5}>
          <p className="leading-relaxed">
            本网站可能包含指向第三方网站的链接。这些链接仅为方便用户而提供，我们不对这些网站的内容或隐私政策负责。访问这些网站的风险由您自行承担。
          </p>
        </Section>

        <Section icon={<FaCogs size={24} />} title="服务变更和终止" index={6}>
          <p className="leading-relaxed">
            我们保留随时修改或终止服务（或其任何部分）的权利，无论是否事先通知。我们可能因任何原因暂停您对全部或部分服务的访问，包括违反这些条款。
          </p>
        </Section>

        <Section icon={<FaExclamationTriangle size={24} />} title="免责声明" index={7}>
          <p className="leading-relaxed">
            本网站及其内容按&quot;原样&quot;提供，不提供任何明示或暗示的保证。我们不保证网站将不间断、安全或无错误运行，也不保证服务将满足您的要求或预期。
          </p>
        </Section>

        <Section icon={<FaBalanceScale size={24} />} title="责任限制" index={8}>
          <p className="leading-relaxed">
            在适用法律允许的最大范围内，我们不对任何直接、间接、附带、特殊、惩罚性或后果性损害承担责任，这些损害可能因您访问、使用或无法使用本网站及其内容而产生。
          </p>
        </Section>

        <Section icon={<FaHistory size={24} />} title="条款修改" index={9}>
          <p className="leading-relaxed">
            我们保留随时修改这些条款的权利。修改后的条款将在本页面上发布，并自发布之日起生效。继续使用本网站表示您接受修改后的条款。
          </p>
        </Section>

        <Section icon={<FaGavel size={24} />} title="适用法律" index={10}>
          <p className="leading-relaxed">
            这些条款受中华人民共和国法律管辖，任何与这些条款相关的争议应根据中国法律解决。
          </p>
        </Section>

        <Section icon={<FaEnvelope size={24} />} title="联系我们" index={11}>
          <p className="leading-relaxed">
            如您对本服务条款有任何疑问或建议，请通过以下方式联系我们：
            <m.span
              className="ml-2 inline-block font-semibold text-light-primary dark:text-dark-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              terms@zaixiaoshuo.com
            </m.span>
          </p>
        </Section>
      </div>
    </m.div>
  );
};

export default TermsOfService;
