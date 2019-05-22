import React, { PureComponent } from 'react';
// import classnames from 'classnames';
import './styles.less';

interface ContentProps {
  className?: string;
  content: '';
}

class Content extends PureComponent<ContentProps> {
  contnteReplace = (content: string) => {
    let result = content;
    if (!content) {
      return '';
    }

    // 添加折叠
    const subtitle = new RegExp(/<h4 class="content-subtitle">([\s\S]*?)<\/h4>/g);
    result = result.replace(subtitle, val => {
      return `<h4 class="content-subtitle-mark"></h4>${val}`;
    });
    result += '<h4 class="content-subtitle-mark"></h4>';
    const h4Content = new RegExp(
      /<h4 class="content-subtitle">([\s\S]*?)<\/h4>([\s\S]*?)<h4 class="content-subtitle-mark">/g,
    );
    result = result.replace(h4Content, (val, m1, m2) => {
      return `<h4 class="content-subtitle" expand=false>${m1}</h4><div class="content-subcontent">${m2}</div><h4 class="content-subtitle-mark">`;
    });

    const h5Content = new RegExp(
      /<h5 class="content-collapse-title">([\s\S]*?)<\/h5>([\s\S]*?)<h5 class="content-collapse-title-end">/g,
    );

    result = result.replace(h5Content, (val, m1, m2) => {
      return `<h5 class="content-collapse-title" expand=false>${m1}</h5><div class="content-h5-content">${m2}</div><h5 class="content-collapse-title-end">`;
    });

    // 隐藏table 里面的行
    result = result.replace(
      new RegExp('<td class="content-table-row-delete">1</td>', 'g'),
      '<td class="content-table-row-delete-hide">1</td>',
    );

    // 去除正文的空行（只有空行）
    result = result.replace(
      new RegExp('<p class="content-text">&nbsp;</p>', 'g'),
      '<p class="content-text"></p>',
    );

    return result;
  };

  // 点击折叠
  clickExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const classList = ['content-subtitle', 'content-collapse-title'];
    if (!classList.includes(target.className)) {
      return;
    }
    const targetVal = target.getAttribute('expand') === 'false' ? 'true' : 'false';
    if (!target.parentNode) {
      target.setAttribute('expand', targetVal);
      return;
    } else {
      const brothers = target.parentNode.querySelectorAll(`.${target.className}`);
      brothers.forEach(item => item.setAttribute('expand', 'false'));
      target.setAttribute('expand', targetVal);
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    const { className, content = '' } = this.props;
    return (
      <div
        className={`${className} content`}
        onClick={this.clickExpand}
        dangerouslySetInnerHTML={{ __html: this.contnteReplace(content) }}
      />
    );
  }
}

export default Content;
