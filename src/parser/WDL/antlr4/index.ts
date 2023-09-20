/*
Copyright (c) 2021, OpenWdl
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name Broad Institute, Inc. nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import parseDraft1 from './draft-1';
import parseDraft2 from './draft-2';
import parseWdl10, { draft3Parser } from './v1.0';
import parseWdl11 from './v1.1';
import { parseExpressionDependencies } from './common';
import { IWdlDocumentOptions } from '../../../model/types';

type WdlParserRaw = (wdl: string) => any;
type WdlParser = (wdl: string) => IWdlDocumentOptions;

const draft1 = {
  parse: (parseDraft1 as WdlParserRaw) as WdlParser,
  versions: ['draft-1'],
};
const draft2 = {
  parse: (parseDraft2 as WdlParserRaw) as WdlParser,
  versions: ['draft-2'],
};
const draft3 = {
  parse: (draft3Parser as WdlParserRaw) as WdlParser,
  versions: ['draft-3'],
};
const v10 = {
  parse: (parseWdl10 as WdlParserRaw) as WdlParser,
  versions: ['1.0'],
};
const v11 = {
  parse: (parseWdl11 as WdlParserRaw) as WdlParser,
  versions: ['1.1'],
};

const CONFIGURATIONS = [
  draft1,
  draft2,
  draft3,
  v10,
  v11,
];

const FALLBACK = draft2;

function parse(wdlContent: string): IWdlDocumentOptions {
  let content = wdlContent || '';
  let {
    parse: parseWdl,
  } = FALLBACK;
  /*
  For portability purposes it is critical that WDL documents be versioned
  so an engine knows how to process it.
  From draft-3 forward, the first line of all WDL files must be a version statement.

  https://github.com/openwdl/wdl/blob/main/versions/1.0/SPEC.md#versioning
   */
  const e = /^version\s+(\S+)\s+([\s\S]+)$/mi.exec(content);
  if (!e || !e[1]) {
    console.warn('From WDL draft-3 forward, the first line of all WDL files must be a version statement.');
    console.log(`WDL file does not contain version statement. Falling back to ${FALLBACK.versions[0]}`);
    parseWdl = FALLBACK.parse;
  } else {
    // removing document version line, because
    // parser could fail if document contains `version` parameters / identifiers, e.g.
    // `TaskName.version`
    content = e[2];
    const config = CONFIGURATIONS.find((aConfiguration) => aConfiguration.versions.includes(e[1]));
    if (!config) {
      console.log(`Unsupported WDL version: ${e[1]}. Falling back to ${FALLBACK.versions[0]}`);
    } else {
      console.log('WDL document version:', e[1]);
    }
    parseWdl = (config || FALLBACK).parse;
  }
  return parseWdl(content);
}

export { parseExpressionDependencies };

export default parse;
