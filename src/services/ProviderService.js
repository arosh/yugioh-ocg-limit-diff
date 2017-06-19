// @flow
export type IndexItem = {
  name: string,
  url: string,
};

export type RuleObject = {
  zero: string[],
  one: string[],
  two: string[],
};

function ignoreSlash(s: string): string {
  return s.replace(/\//g, '');
}

class ProviderService {
  async fetchIndex(): Promise<IndexItem[]> {
    return await import('../resources/index.json');
  }
  async fetchRule(name: string): Promise<RuleObject> {
    const canonicalName = ignoreSlash(name);
    switch (canonicalName) {
      case '1999':
        return await import('../resources/1999.json');
      case '20000401':
        return await import('../resources/20000401.json');
      case '20000515':
        return await import('../resources/20000515.json');
      case '20000715':
        return await import('../resources/20000715.json');
      case '20000815':
        return await import('../resources/20000815.json');
      case '20001101':
        return await import('../resources/20001101.json');
      case '20010115':
        return await import('../resources/20010115.json');
      case '20010528':
        return await import('../resources/20010528.json');
      case '20020101':
        return await import('../resources/20020101.json');
      case '20020501':
        return await import('../resources/20020501.json');
      case '20030101':
        return await import('../resources/20030101.json');
      case '20030410':
        return await import('../resources/20030410.json');
      case '20030701':
        return await import('../resources/20030701.json');
      case '20031015':
        return await import('../resources/20031015.json');
      case '20040301':
        return await import('../resources/20040301.json');
      case '20040901':
        return await import('../resources/20040901.json');
      case '20050301':
        return await import('../resources/20050301.json');
      case '20050901':
        return await import('../resources/20050901.json');
      case '20060301':
        return await import('../resources/20060301.json');
      case '20060901':
        return await import('../resources/20060901.json');
      case '20070301':
        return await import('../resources/20070301.json');
      case '20070901':
        return await import('../resources/20070901.json');
      case '20080301':
        return await import('../resources/20080301.json');
      case '20080901':
        return await import('../resources/20080901.json');
      case '20090301':
        return await import('../resources/20090301.json');
      case '20090901':
        return await import('../resources/20090901.json');
      case '20100301':
        return await import('../resources/20100301.json');
      case '20100901':
        return await import('../resources/20100901.json');
      case '20110301':
        return await import('../resources/20110301.json');
      case '20110901':
        return await import('../resources/20110901.json');
      case '20120301':
        return await import('../resources/20120301.json');
      case '20120901':
        return await import('../resources/20120901.json');
      case '20130301':
        return await import('../resources/20130301.json');
      case '20130901':
        return await import('../resources/20130901.json');
      case '20131101':
        return await import('../resources/20131101.json');
      case '20140201':
        return await import('../resources/20140201.json');
      case '20140401':
        return await import('../resources/20140401.json');
      case '20140701':
        return await import('../resources/20140701.json');
      case '20141001':
        return await import('../resources/20141001.json');
      case '20150101':
        return await import('../resources/20150101.json');
      case '20150401':
        return await import('../resources/20150401.json');
      case '20150701':
        return await import('../resources/20150701.json');
      case '20151001':
        return await import('../resources/20151001.json');
      case '20160101':
        return await import('../resources/20160101.json');
      case '20160401':
        return await import('../resources/20160401.json');
      case '20160701':
        return await import('../resources/20160701.json');
      case '20161001':
        return await import('../resources/20161001.json');
      case '20170101':
        return await import('../resources/20170101.json');
      case '20170401':
        return await import('../resources/20170401.json');
      case '20170701':
        return await import('../resources/20170701.json');
      default:
        throw new Error('canonicalName = ' + canonicalName);
    }
  }
}

export default new ProviderService();
