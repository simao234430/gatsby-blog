import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery,useStaticQuery, graphql,withPrefix } from 'gatsby'
import Header  from '../Header'
import gconfig   from '../../../gatsby-config'
// import { Layout } from 'antd'
import { Sidebar } from '../sidebar'
import { TableOfContents } from '../TableOfContents'
import { getCurrentLangKey } from 'ptz-i18n';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
interface LayoutProps {
  children: React.ReactElement<any>;
  location: Location;
  pageContext: any;
}

const lngs = ['zh', 'en'];
// const { Sider, Content } = Layout
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    initImmediate: false,
    fallbackLng: 'zh',
    keySeparator: false,
    react: {
      useSuspense: false,
    },
  });
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        siteUrl
        navs {
          slug
          title {
            zh
            en
          }
        }

      }
    }

  }
`;

const pathPrefix = withPrefix('/').replace(/\/$/, '');
const path = location.pathname.replace(pathPrefix, '');
const currentLangKey = getCurrentLangKey(lngs, 'zh', path);

 
if (!i18n.options.lng || process.env.NODE_ENV === 'production') {
  i18n.init({
    lng: currentLangKey,
  });
}
let resources = {};
try {
  resources = JSON.parse(locales.internal.content);
} catch (e) {
  // empty
}
if (!i18n.options.resources) {
  i18n.init({
    resources,
  });
}
const { site , locales } = useStaticQuery(query);
const {
  siteMetadata: {
    title,
    navs=[]

  },
} = site;
  
  return (
      <div>
        <Header
          navs={navs}
        />
{ children }
      </div>
  )
}

export default RootLayout
