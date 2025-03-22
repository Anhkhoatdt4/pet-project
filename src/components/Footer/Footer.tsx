import React from "react";

interface FooterItem {
  title: string;
  list?: { label: string; path: string }[];
  description?: string;
}

interface FooterProps {
  content: {
    footer: {
      items: FooterItem[];
      copyright: string;
    };
  };
}

const Footer: React.FC<FooterProps> = ({ content }) => {
    return (
      <footer className="bg-black text-white py-3">
        <div className="container mx-auto flex flex-wrap justify-between px-6 lg:px-20">
              {content?.footer?.items?.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  {item.list ? (
                    <ul>
                      {item.list.map((listItem, i) => (
                        <li key={i} className="mb-2">
                          <a href={listItem.path} className="hover:text-gray-400 transition">
                            {listItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
    
            {/* Copyright */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            {content?.footer?.copyright}
          </div>
        </footer>
    );
  };
  

export default Footer;
