'use client';

import React, { ReactNode } from 'react';
import { m } from 'framer-motion';
import {
  FaUserShield,
  FaDatabase,
  FaShareAlt,
  FaLock,
  FaUserCog,
  FaCookieBite,
  FaHistory,
  FaEnvelope,
  FaShieldAlt,
  FaServer,
  FaUserSecret,
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

const PrivacyPolicy = () => {
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

  // Information collection items
  const infoCollectionItems = [
    '个人识别信息（如电子邮件地址、用户名等），仅当您注册账户或与我们互动时',
    '使用数据（如IP地址、浏览器类型、设备信息、访问时间等）',
    'Cookie和类似技术收集的数据',
  ];

  // Information usage items
  const infoUsageItems = [
    '提供、维护和改进我们的服务',
    '处理和完成您的请求',
    '发送通知和更新',
    '防止欺诈和增强安全性',
    '进行分析以改善用户体验',
  ];

  // Information sharing items
  const infoSharingItems = [
    '在得到您的明确同意后',
    '与提供服务的合作伙伴共享（这些合作伙伴需遵守保密义务）',
    '符合法律要求或保护我们的权利',
    '在业务转让如合并、收购或资产出售时',
  ];

  // User rights items
  const userRightsItems = [
    '访问、更正或删除您的个人信息',
    '反对或限制对您数据的某些处理',
    '数据可携带权',
    '撤回同意（如适用）',
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
        隐私政策
      </m.h1>

      <m.div
        className="mb-10 text-center text-light-text-secondary dark:text-dark-text-secondary"
        variants={fadeInVariants}
      >
        <p>最后更新日期：{new Date().toISOString().split('T')[0]}</p>
      </m.div>

      <div className="mx-auto grid max-w-5xl gap-8">
        <Section icon={<FaShieldAlt size={24} />} title="引言" index={0}>
          <p className="leading-relaxed">
            最爱小说网（"我们"，"我们的"或"本网站"）尊重您的隐私，致力于保护您的个人信息。本隐私政策描述了我们如何收集、使用、存储和保护您在使用我们的网站和服务时提供的信息。
          </p>
        </Section>

        <Section icon={<FaDatabase size={24} />} title="信息收集" index={1}>
          <p className="mb-4">我们可能收集以下类型的信息：</p>
          <div className="space-y-2">
            {infoCollectionItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaUserSecret size={18} />}
                text={item}
                color="from-green-500 to-teal-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaUserShield size={24} />} title="信息使用" index={2}>
          <p className="mb-4">我们使用收集的信息用于：</p>
          <div className="space-y-2">
            {infoUsageItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaServer size={18} />}
                text={item}
                color="from-blue-500 to-indigo-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaShareAlt size={24} />} title="信息共享" index={3}>
          <p className="mb-4">除以下情况外，我们不会与第三方共享您的个人信息：</p>
          <div className="space-y-2">
            {infoSharingItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaGlobe size={18} />}
                text={item}
                color="from-purple-500 to-pink-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaLock size={24} />} title="数据安全" index={4}>
          <p className="leading-relaxed">
            我们采取合理的安全措施来保护您的个人信息不被未授权访问、篡改、泄露或破坏。然而，互联网传输方式本身并非100%安全，我们无法保证信息传输的绝对安全性。
          </p>
        </Section>

        <Section icon={<FaUserCog size={24} />} title="您的权利" index={5}>
          <p className="mb-4">根据适用法律，您可能拥有以下权利：</p>
          <div className="space-y-2">
            {userRightsItems.map((item, idx) => (
              <AnimatedItem
                key={idx}
                icon={<FaUserCog size={18} />}
                text={item}
                color="from-orange-500 to-red-600"
                index={idx}
              />
            ))}
          </div>
        </Section>

        <Section icon={<FaCookieBite size={24} />} title="Cookie政策" index={6}>
          <p className="leading-relaxed">
            我们使用Cookie和类似技术来增强您的浏览体验、分析网站流量以及个性化内容。您可以通过浏览器设置控制Cookie的使用。
          </p>
        </Section>

        <Section icon={<FaHistory size={24} />} title="隐私政策更新" index={7}>
          <p className="leading-relaxed">
            我们可能会不时更新此隐私政策。任何更改都会在本页面上发布，如果是重大更改，我们将通过网站通知或直接联系您。
          </p>
        </Section>

        <Section icon={<FaEnvelope size={24} />} title="联系我们" index={8}>
          <p className="leading-relaxed">
            如您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
            <m.span
              className="ml-2 inline-block font-semibold text-light-primary dark:text-dark-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              privacy@zaixiaoshuo.com
            </m.span>
          </p>
        </Section>
      </div>
    </m.div>
  );
};

export default PrivacyPolicy;
