export function getCandidateColourClass (candidate) {
    if (candidate.standingForMayor) {
        return 'candidate-mayor';
    } else if (candidate.standingForCouncillor) {
        return 'candidate-councillor';
    } else if (candidate.standingForLocalBoard) {
        return 'candidate-local-board';
    }
}

export function getCandidateBreakdownColourClass (candidate) {
    if(candidate.standingForMayor){
        return 'candidate-breakdown-mayor-button';
    } else if(candidate.standingForCouncillor) {
        return 'candidate-breakdown-councillor-button';
    } else if(candidate.standingForLocalBoard) {
        return 'candidate-breakdown-local-board';
    }
}

