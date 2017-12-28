import pipeline from '../pipeline';

const wdl = `
workflow splitmerge {
  File data

  call split {
    input:
      data = data
  }
  call process as odd {
    input:
      data = split.odd
  }
  call process as even {
    input:
      data = split.even
  }
  call merge {
    input:
      odd = odd.result,
      even = even.result
  }

  output {
    File result = merge.result
  }
}

task split {
  File data

  command {
    split \${data}
  }
  output {
    File odd = "\${data}.odd"
    File even = "\${data}.even"
  }
}

task process {
  File data

  command {
    process \${data} -o \${data}.processed
  }
  output {
    File result = "\${data}.processed"
  }
}

task merge {
  File odd
  File even

  command {
    merge \${odd} \${even} -o "merged.dat"
  }
  output {
    File result = "merged.dat"
  }
}
`;

async function createFlow() {
  const res = await pipeline.parse(wdl);
  return res.model[0];
}

export default { createFlow, wdl };
